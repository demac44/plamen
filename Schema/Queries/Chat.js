import { GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import { ChatListType, ChatMessagesType, ChatType, GroupChatType, MsgNotificationType } from '../TypeDefs/Chat.js';

import CryptoJS from 'crypto-js'

export const CHAT_EXISTS = {
    type: ChatType,
    args: {
        user1_ID: {type: GraphQLInt},
        user2_ID: {type: GraphQLInt}
    },    
    async resolve(_, args) {
        const {user1_ID, user2_ID} = args
        const sql = `SELECT * FROM chats WHERE user1_ID=${user1_ID} AND user2_ID=${user2_ID} OR user1_ID=${user2_ID} AND user2_ID=${user1_ID}` 
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }    
}

export const GET_ALL_USER_CHATS = {
    type: new GraphQLList(ChatListType),
    args:{
        user1_ID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {user1_ID} = args
        const sql = `SELECT chatID, 
                    IF(user1_ID=${user1_ID}, user2_ID, user1_ID) AS userID 
                    FROM chats 
                    WHERE (user1_ID=${user1_ID} OR user2_ID=${user1_ID})
                    AND user1_ID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${user1_ID} AND blockedId=user1_ID)
                    AND user1_ID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${user1_ID} AND blockerId=user1_ID)`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result    
    } 
}

export const GET_CHAT_LIST = {
    type: new GraphQLList(ChatListType),
    args:{
        user1_ID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {user1_ID} = args
        const sql = `
        SELECT first_name, last_name, username, profile_picture, chats.chatID, users.userID, MIN(time_sent), last_seen
        FROM users
        JOIN chats ON IF (chats.user1_ID=${user1_ID}, chats.user2_ID=users.userID, chats.user1_ID=users.userID)
        JOIN messages ON chats.chatID=messages.chatID
        WHERE 
        disabled=false 
        AND (chats.user1_ID=${user1_ID} OR chats.user2_ID=${user1_ID})
        AND users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${user1_ID} AND blockedId=users.userID)
        AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${user1_ID} AND blockerId=users.userID)
        GROUP BY chats.chatID
        ORDER BY MAX(time_sent) DESC`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result    
    }  
    
}

export const LAST_MESSAGE = {
    type: ChatMessagesType,
    args:{
        chatID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {chatID} = args
        const sql = `SELECT msg_text, type, userID FROM messages WHERE chatID=${chatID} ORDER BY time_sent DESC LIMIT 1`
        const result = await connection.promise().query(sql).then(res => {return res[0]})
        if(result[0]?.msg_text){
            const decrypted = CryptoJS.AES.decrypt(result[0]?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            const res = {...result[0], msg_text: decrypted}
            return res
        }
    }
}
 
export const GET_MESSAGES = {
    type: new GraphQLList(ChatMessagesType),
    args: {
        chatID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
    },
    async resolve(_, args) {
        const {chatID, limit, offset} = args
        const sql = `SELECT msgID, msg_text, time_sent, chatID, username, type, url, users.userID, profile_picture, storyID  
                     FROM messages 
                     JOIN users ON messages.userID=users.userID
                     WHERE chatID=${chatID} 
                     ORDER BY time_sent DESC 
                     LIMIT ${limit} OFFSET ${offset}`  
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        await result.map(msg => {
            const decrypted = CryptoJS.AES.decrypt(msg?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            Object.assign(msg, {msg_text: decrypted})
        })
        return result
    }
}

// export const GET_MESSAGES = {
//     type: new GraphQLList(ChatMessagesType),
//     args: {
//         chatID: {type: GraphQLInt},
//         limit: {type: GraphQLInt},
//         offset: {type: GraphQLInt},
//     },
//     async resolve(_, args) {
//         const {chatID, limit, offset} = args
//         const sql = `SELECT
//                         msgID,
//                         msg_text,
//                         time_sent,
//                         chatID,
//                         username,
//                         TYPE,
//                         url,
//                         users.userID,
//                         profile_picture,
//                         null as storyID
//                         FROM
//                             messages
//                         JOIN users ON messages.userID = users.userID
//                         WHERE
//                             chatID =${chatID}
//                         UNION ALL
//                         SELECT
//                             msgID,
//                             msg_text,
//                             time_sent,
//                             chatID,
//                             username,
//                             TYPE,
//                             url,
//                             users.userID,
//                             profile_picture,
//                             storyID
//                         FROM
//                             story_replies
//                         JOIN users ON story_replies.userID = users.userID 
//                         WHERE
//                             chatID =${chatID}
//                         ORDER BY time_sent DESC
//                         LIMIT ${limit} OFFSET ${offset}`  
//         const result = await connection.promise().query(sql).then((res)=>{return res[0]})
//         await result.map(msg => {
//             const decrypted = CryptoJS.AES.decrypt(msg?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
//             Object.assign(msg, {msg_text: decrypted})
//         })
//         return result
//     }
// }


export const GET_CHAT_MEDIA = {
    type: new GraphQLList(ChatMessagesType),
    args:{
        chatID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {chatID} = args
        const sql = `SELECT msgID, userID, url, type FROM messages WHERE chatID=${chatID} AND type="image" OR type="video"`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
    }
}

export const COUNT_ALL_MSGS = {
    type: MsgNotificationType,
    args:{
        receiver_id:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {receiver_id} = args
        const sql = `SELECT COUNT(Nid) AS msgCount 
                     FROM msg_notifications 
                        WHERE receiver_id=${receiver_id}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }
}

export const COUNT_MSGS = {
    type:MsgNotificationType,
    args: {
        chatID:{type:GraphQLInt},
        receiver_id:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {chatID, receiver_id} = args
        const sql = `SELECT COUNT(Nid) as msgCount FROM msg_notifications WHERE chatID=${chatID} AND receiver_id=${receiver_id}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }
}

// GROUP CHATS

export const GET_ALL_GROUP_CHATS = {
    type: new GraphQLList(GroupChatType),
    args:{
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT group_chats.groupChatId, admin 
                     FROM group_chats_members 
                     JOIN group_chats ON group_chats_members.groupChatId=group_chats.groupChatId
                     WHERE userID=${userID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result    
    } 
}

export const GET_GROUP_CHATS = {
    type: new GraphQLList(GroupChatType),
    args:{
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT group_chats_members.groupChatId, name, group_image 
                     FROM group_chats_members
                     JOIN group_chats ON group_chats_members.groupChatId=group_chats.groupChatId
                     WHERE userID=${userID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result    
    } 
}

export const GET_GROUP_MESSAGES = {
    type: new GraphQLList(ChatMessagesType),
    args: {
        groupChatId: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {groupChatId, limit, offset, userID} = args
        const sql = `SELECT msg_text, time_sent, groupChatId, username, type, url, users.userID, profile_picture, msgID 
                     FROM group_chats_messages 
                     JOIN users ON group_chats_messages.userID=users.userID
                     WHERE groupChatId=${groupChatId}
                     AND users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                     AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
                     ORDER BY time_sent DESC 
                     LIMIT ${limit} OFFSET ${offset}`  
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        await result.map(msg => {
            const decrypted = CryptoJS.AES.decrypt(msg?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            Object.assign(msg, {msg_text: decrypted})
        })
        return result
    }
}

export const LAST_MESSAGE_GROUP = {
    type: ChatMessagesType,
    args:{
        groupChatId:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {groupChatId} = args
        const sql = `SELECT msg_text, type, userID FROM group_chats_messages WHERE groupChatId=${groupChatId} ORDER BY time_sent DESC LIMIT 1`
        const result = await connection.promise().query(sql).then(res => {return res[0]})
        if(result[0]?.msg_text){
            const decrypted = CryptoJS.AES.decrypt(result[0]?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            const res = {...result[0], msg_text: decrypted}
            return res
        }
    }
}

export const GET_GROUP_CHAT_MEMBERS = {
    type: new GraphQLList(ChatListType),
    args:{
        groupChatId: {type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset:{type:GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupChatId, limit, offset, userID} = args
        const sql = `SELECT first_name, last_name, users.userID, username, profile_picture
                     FROM group_chats_members
                     JOIN users ON group_chats_members.userID=users.userID
                     WHERE groupChatId=${groupChatId}
                     AND users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                     AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
                     LIMIT ${limit} OFFSET ${offset}
                     `
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}

export const GET_GROUP_CHAT_MEMBER = {
    type: ChatListType,
    args:{
        groupChatId: {type:GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupChatId, userID} = args
        const sql = `SELECT * FROM group_chats_members WHERE groupChatId=${groupChatId} AND userID=${userID}`
        const result = await connection.promise().query(sql).then(res=>{return res[0][0]})
        return result
    } 
}

// export const GET_CHAT = {
//     type:ChatType,
//     args: {
//         chatID: {type: GraphQLInt} 
//     },
//     async resolve(_, args){
//         const {chatID} = args
//         const sql = `SELECT * FROM chats WHERE chatID=${chatID}`
//         const result = await connection.promise().query(sql).then((res)=>{return res[0]})
//         return result[0]
//     }

// }


// export const GET_CHAT_MEDIA = {
//     type: new GraphQLList(ChatMessagesType),
//     args:{
//         chatID:{type:GraphQLInt}
//     },
//     async resolve(_, args){
//         const {chatID} = args
//         const sql = `SELECT msgID, userID, url, type FROM messages WHERE chatID=${chatID} AND type="image" OR type="video"`
//         const result = await connection.promise().query(sql).then((res)=>{return res[0]})
//         return result
//     }
// }

// export const COUNT_ALL_MSGS = {
//     type: MsgNotificationType,
//     args:{
//         receiver_id:{type:GraphQLInt}
//     },
//     async resolve(_, args){
//         const {receiver_id} = args
//         const sql = `SELECT COUNT(Nid) AS msgCount FROM msg_notifications WHERE receiver_id=${receiver_id}`
//         const result = await connection.promise().query(sql).then((res)=>{return res[0]})
//         return result[0]
//     }
// }

// export const COUNT_MSGS = {
//     type:MsgNotificationType,
//     args: {
//         chatID:{type:GraphQLInt},
//         receiver_id:{type:GraphQLInt}
//     },
//     async resolve(_, args){
//         const {chatID, receiver_id} = args
//         const sql = `SELECT COUNT(Nid) as msgCount FROM msg_notifications WHERE chatID=${chatID} AND receiver_id=${receiver_id}`
//         const result = await connection.promise().query(sql).then((res)=>{return res[0]})
//         return result[0]
//     }
// }