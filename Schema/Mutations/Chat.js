import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { ChatMessagesType, ChatType, GroupChatType, MsgNotificationType } from "../TypeDefs/Chat.js"

import { pubsub } from '../../server.js'

import CryptoJS from 'crypto-js'

export const CREATE_CHAT = {
    type: ChatType,
    args: {
        user1_ID: {type: GraphQLInt},
        user2_ID: {type: GraphQLInt},
    },
    async resolve(_, args) {
        const {user1_ID, user2_ID} = args
        const sql = `INSERT INTO chats (chatID, user1_ID, user2_ID, date_created)
        VALUES (null, ${user1_ID}, ${user2_ID}, null)`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        Object.assign(args, {chatID: result.insertId})
        return args
    }
}

export const DELETE_CHAT = {
    type: ChatType,
    args:{
        chatID:{type:GraphQLInt}
    },
    resolve(_ , args){
        const {chatID} = args
        const sql = `DELETE FROM chats WHERE chatID=${chatID}`    
        connection.query(sql)
        return args
    }
}
export const SEND_MESSAGE = {
    type: ChatMessagesType,
    args: {
        chatID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        msg_text: {type: GraphQLString},
        url: {type: GraphQLString},
        type: {type:GraphQLString},
        username: {type: GraphQLString},
        profile_picture: {type: GraphQLString}
    },
    async resolve(_, args){
        const {chatID, userID, msg_text, url, type, username, profile_picture} = args
        const encrypted = CryptoJS.AES.encrypt(msg_text, process.env.MESSAGE_ENCRYPTION_KEY)
        const sql = `INSERT INTO messages (msgID, chatID, userID, time_sent, msg_text, url, type)
                     VALUES (null, ${chatID}, ${userID}, null, "${encrypted}", "${url}", "${type}")`
        const msg = await connection.promise().query(sql).then(res=>{return res[0]})
        pubsub.publish('NEW_MESSAGE', {newMessage: {
                                        chatID, 
                                        msg_text, 
                                        userID, 
                                        url, 
                                        type, 
                                        msgID: msg.insertId, 
                                        time_sent: new Date().getTime(),
                                        username,
                                        profile_picture
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
        const sql = `DELETE FROM messages WHERE msgID=${msgID}`
        connection.query(sql)
        return args
    }
}

export const MSG_NOTIFICATION = {
    type:MsgNotificationType,
    args:{
        sender_id: {type:GraphQLInt},
        receiver_id: {type:GraphQLInt},
        chatID: {type:GraphQLInt}      
    },
    async resolve(_, args){ 
        const {sender_id, receiver_id, chatID} = args
        const sql = `INSERT INTO msg_notifications (Nid, sender_id, receiver_id, chatID)
                        VALUES (null, ${sender_id}, ${receiver_id}, ${chatID})`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        pubsub.publish('MSG_NOTIFICATION', {newMsgNotification: {sender_id, receiver_id, chatID, Nid:result.insertId}})
        return args
    }
}

export const SEEN = {
    type:ChatMessagesType,
    args: {
        chatID:{type:GraphQLInt},
        receiver_id:{type:GraphQLInt}
    },
    resolve(_, args){
        const {chatID, receiver_id} = args
        const sql = `DELETE FROM msg_notifications WHERE chatID=${chatID} AND receiver_id=${receiver_id}` 
        connection.query(sql)
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
        const sql = `INSERT INTO group_chats (admin, name) VALUES (${userID}, "${name}")`
        const result = await connection.promise().query(sql).then(res=>{
            const sql2 = `INSERT INTO group_chats_members (groupChatId, userID, role) 
                            VALUES (${res[0].insertId}, ${userID}, "ADMIN")`
            connection.query(sql2)
            return res[0]
        })
        Object.assign(args, {groupChatId: result.insertId})
        return args
    }
}

export const DELETE_GROUP_CHAT = {
    type: GroupChatType,
    args:{
        chatID:{type:GraphQLInt}
    },
    resolve(_ , args){
        const {chatID} = args
        const sql = `DELETE FROM group_chats WHERE groupChatId=${chatID}`    
        connection.query(sql)
        return args
    }
}
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
        const encrypted = CryptoJS.AES.encrypt(msg_text, process.env.MESSAGE_ENCRYPTION_KEY)
        const sql = `INSERT INTO group_chats_messages (groupChatId, userID, msg_text, url, type)
                     VALUES (${groupChatId}, ${userID}, "${encrypted}", "${url}", "${type}")`
        await connection.promise().query(sql).then(res=>{return res[0]})
        pubsub.publish('NEW_GROUP_MESSAGE', 
                    {newGroupMessage: {groupChatId, 
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


// export const DELETE_MESSAGE = {
//     type:ChatMessagesType,
//     args: {
//         msgID: {type:GraphQLInt}
//     },
//     resolve(_, args){
//         const {msgID} = args
//         const sql = `DELETE FROM messages WHERE msgID=${msgID}`
//         connection.query(sql)
//         return args
//     }
// }

// export const MSG_NOTIFICATION = {
//     type:MsgNotificationType,
//     args:{
//         sender_id: {type:GraphQLInt},
//         receiver_id: {type:GraphQLInt},
//         chatID: {type:GraphQLInt}      
//     },
//     async resolve(_, args){ 
//         const {sender_id, receiver_id, chatID} = args
//         const sql = `INSERT INTO msg_notifications (Nid, sender_id, receiver_id, chatID)
//                         VALUES (null, ${sender_id}, ${receiver_id}, ${chatID})`
//         const result = await connection.promise().query(sql).then(res=>{return res[0]})
//         pubsub.publish('MSG_NOTIFICATION', {newMsgNotification: {sender_id, receiver_id, chatID, Nid:result.insertId}})
//         return args
//     }
// }

// export const SEEN = {
//     type:ChatMessagesType,
//     args: {
//         chatID:{type:GraphQLInt},
//         receiver_id:{type:GraphQLInt}
//     },
//     resolve(_, args){
//         const {chatID, receiver_id} = args
//         const sql = `DELETE FROM msg_notifications WHERE chatID=${chatID} AND receiver_id=${receiver_id}` 
//         connection.query(sql)
//         return args
//     }
// }