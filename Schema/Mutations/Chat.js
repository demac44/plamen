import { GraphQLString, GraphQLInt } from "graphql"
import connection from "../../middleware/db.js"
import { ChatMessagesType, GroupChatType, MsgNotificationType, ChatListType } from "../TypeDefs/Chat.js"

import { pubsub } from '../../server.js'

import CryptoJS from 'crypto-js'

export const DELETE_CHAT = {
    type: ChatMessagesType,
    args:{
        sender: {type: GraphQLString},
        receiver: {type: GraphQLString}
    },
    resolve(_ , args){
        const {sender, receiver} = args
        connection.query(`DELETE FROM messages WHERE (sender="${sender}" AND receiver="${receiver}") OR (sender="${receiver}" AND receiver="${sender}")`)
        return args
    }
}


// ENCRYPTED MESSAGE
// export const SEND_MESSAGE = {
//     type: ChatMessagesType,
//     args: {
//         msg_text: {type: GraphQLString},
//         sender: {type: GraphQLString},
//         receiver: {type: GraphQLString},
//         url: {type: GraphQLString},
//         type: {type:GraphQLString},
//         profile_picture: {type: GraphQLString}
//     },
//     async resolve(_, args){
//         const {sender, receiver, msg_text, url, type, profile_picture} = args
//         const encrypted = CryptoJS.AES.encrypt(msg_text, process.env.MESSAGE_ENCRYPTION_KEY)
//         const msg = await connection.promise().query(`
//             INSERT INTO messages (sender, receiver, msg_text, url, type)
//             VALUES ("${sender}", "${receiver}", "${encrypted}", "${url}", "${type}")
//         `).then(res=>{return res[0]})

//         pubsub.publish('NEW_MESSAGE', {newMessage: {
//                                         msg_text, 
//                                         url, 
//                                         type, 
//                                         msgID: msg.insertId, 
//                                         time_sent: new Date().getTime(),
//                                         profile_picture,
//                                         storyID: null,
//                                         sender,
//                                         receiver
//                                         }})
//         return args
//     }
// }


export const SEND_MESSAGE = {
    type: ChatMessagesType,
    args: {
        msg_text: {type: GraphQLString},
        sender: {type: GraphQLString},
        receiver: {type: GraphQLString},
        url: {type: GraphQLString},
        type: {type:GraphQLString},
        profile_picture: {type: GraphQLString}
    },
    async resolve(_, args){
        const {sender, receiver, msg_text, url, type, profile_picture} = args
        const msg = await connection.promise().query(`
            INSERT INTO messages (sender, receiver, msg_text, url, type)
            VALUES ("${sender}", "${receiver}", "${msg_text}", "${url}", "${type}")
        `).then(res=>{return res[0]})
        pubsub.publish('NEW_MESSAGE', {newMessage: {
                                        msg_text, 
                                        url, 
                                        type, 
                                        msgID: msg.insertId, 
                                        time_sent: new Date().getTime(),
                                        profile_picture,
                                        storyID: null,
                                        sender,
                                        receiver
                                        }})
        return args
    }
}



export const DELETE_MESSAGE = {
    type:ChatMessagesType,
    args: {
        msgID: {type:GraphQLInt}
    },
    resolve(_, args){
        const {msgID} = args
        connection.query(`DELETE FROM messages WHERE msgID=${msgID}`)
        return args
    }
}

export const MSG_NOTIFICATION = {
    type: MsgNotificationType,
    args:{
        sender: {type:GraphQLString},
        receiver: {type:GraphQLString},
    },
    async resolve(_, args){ 
        const {sender, receiver, chatID} = args
        await connection.promise().query(`
            INSERT INTO msg_notifications (sender, receiver)
            VALUES ("${sender}", "${receiver}")
        `).then(()=>{
            pubsub.publish('MSG_NOTIFICATION', {newMsgNotification: {sender, receiver}})
        })
        return args
    }
}

export const DELETE_MSG_NOTIFICATIONS= {
    type:ChatMessagesType,
    args: {
        sender:{type:GraphQLString},
        receiver:{type:GraphQLString}
    },
    resolve(_, args){
        const {receiver, sender} = args
        connection.query(`DELETE FROM msg_notifications WHERE receiver="${receiver}" AND sender="${sender}"`)
        return args
    }
}


// GROUP CHAT


export const CREATE_GROUP_CHAT = {
    type: GroupChatType,
    args: {
        userID: {type: GraphQLInt},
        name: {type: GraphQLString}
    },
    async resolve(_, args) {
        const {userID, name} = args
        const result = await connection.promise().query(`
            INSERT INTO group_chats (admin, name) VALUES (${userID}, "${name}")
        `).then(res=>{
            connection.query(`
                INSERT INTO group_chats_members (groupChatId, userID) 
                VALUES (${res[0].insertId}, ${userID})
            `)
            return res[0]
        })
    Object.assign(args, {groupChatId: result.insertId})
    return args
    }
}

export const DELETE_GROUP_CHAT = {
    type: GroupChatType,
    args:{
        groupChatId:{type:GraphQLInt}
    },
    resolve(_ , args){
        const {groupChatId} = args
        connection.query(`DELETE FROM group_chats WHERE groupChatId=${groupChatId}`)
        return args
    }
}

// export const SEND_GROUP_MESSAGE = {
//     type: ChatMessagesType,
//     args: {
//         groupChatId: {type: GraphQLInt},
//         userID: {type: GraphQLInt},
//         msg_text: {type: GraphQLString},
//         url: {type: GraphQLString},
//         type: {type:GraphQLString},
//         username: {type: GraphQLString},
//         profile_picture: {type: GraphQLString}
//     },
//     async resolve(_, args){
//         const {groupChatId, userID, msg_text, url, type, username, profile_picture} = args
//         const encrypted = CryptoJS.AES.encrypt(msg_text, process.env.MESSAGE_ENCRYPTION_KEY)
//         const res = await connection.promise().query(`
//             INSERT INTO group_chats_messages (groupChatId, userID, msg_text, url, type)
//             VALUES (${groupChatId}, ${userID}, "${encrypted}", "${url}", "${type}")
//         `).then(res=>{return res[0]})
//         pubsub.publish('NEW_GROUP_MESSAGE', 
//                     {newGroupMessage: {
//                                        msgID: res.insertId,
//                                        groupChatId, 
//                                        username, 
//                                        msg_text, 
//                                        userID, 
//                                        url, 
//                                        type, 
//                                        time_sent: new Date().getTime()}},
//                                        profile_picture)  
//         return args
//     }
// }
export const SEND_GROUP_MESSAGE = {
    type: ChatMessagesType,
    args: {
        groupChatId: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        msg_text: {type: GraphQLString},
        url: {type: GraphQLString},
        type: {type:GraphQLString},
        username: {type: GraphQLString},
        profile_picture: {type: GraphQLString}
    },
    async resolve(_, args){
        const {groupChatId, userID, msg_text, url, type, username, profile_picture} = args
        const res = await connection.promise().query(`
            INSERT INTO group_chats_messages (groupChatId, userID, msg_text, url, type)
            VALUES (${groupChatId}, ${userID}, "${msg_text}", "${url}", "${type}")
        `).then(res=>{return res[0]})

        pubsub.publish('NEW_GROUP_MESSAGE', 
                    {newGroupMessage: {
                                       msgID: res.insertId,
                                       groupChatId, 
                                       username, 
                                       msg_text, 
                                       userID, 
                                       url, 
                                       type, 
                                       time_sent: new Date().getTime()}},
                                       profile_picture)  
        return args
    }
}


export const DELETE_GROUP_CHAT_MESSAGE = {
    type:ChatMessagesType,
    args: {
        msgID: {type:GraphQLInt}
    },
    resolve(_, args){
        const {msgID} = args
        connection.query(`DELETE FROM group_chats_messages WHERE msgID=${msgID}`)
        return args
    }
}

export const LEAVE_GROUP_CHAT_MEMBER = {
    type: GroupChatType,
    args:{
        groupChatId:{type:GraphQLInt},
        userID: {type: GraphQLInt},
    },
    resolve(_, args){
        const {groupChatId, userID} = args
        connection.query(`DELETE FROM group_chats_members WHERE groupChatId=${groupChatId} AND userID=${userID}`)
        return args
    }
}
export const LEAVE_GROUP_CHAT_ADMIN = {
    type: GroupChatType,
    args:{
        groupChatId:{type:GraphQLInt},
        userID: {type: GraphQLInt},
    },
    async resolve(_, args){
        const {groupChatId, userID} = args
        await connection.promise().query(`
            UPDATE group_chats AS T1,
            (SELECT userID FROM group_chats_members WHERE groupChatId=${groupChatId} AND userID<>${userID} LIMIT 1) AS T2
            SET T1.admin=T2.userID
            WHERE groupChatId=${groupChatId}
        `).then(()=>{
            connection.query(`DELETE FROM group_chats_members WHERE groupChatId=${groupChatId} AND userID=${userID}`)
            return 0
        })
        return args
    }
}

let error = null;

export const ADD_GROUP_CHAT_USER = {
    type: ChatListType,
    args:{
        groupChatId:{type:GraphQLInt},
        username: {type: GraphQLString}
    },
    async resolve(_, args){
        error = null
        const {groupChatId, username} = args
        return await connection.promise().query(`
            SELECT userID FROM users WHERE username="${username}"
        `).then(res=>{
            if(!res[0][0]?.userID) {
                return {error: "User not found"}
            } else {
                connection.query(`
                    INSERT INTO group_chats_members (groupChatId, userID)
                    VALUES (${groupChatId}, ${res[0][0].userID})
                `)
                return {error: null}
            }
        })
    }
}

export const REMOVE_GROUP_CHAT_MEMBER = {
    type: ChatListType,
    args:{
        groupChatId: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    },
    resolve(_, args){
        const {groupChatId, userID} = args
        connection.query(`DELETE FROM group_chats_members WHERE groupChatId=${groupChatId} AND userID=${userID}`)
        return args
    }
}