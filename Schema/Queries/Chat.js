import { GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import { ChatListType, ChatMessagesType, ChatType, MsgNotificationType } from '../TypeDefs/Chat.js';

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

export const GET_CHAT_LIST = {
    type: new GraphQLList(ChatListType),
    args:{
        user1_ID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {user1_ID} = args
        const sql = `
        SELECT first_name, last_name, username, profile_picture, chats.chatID, users.userID, date_created FROM users 
        JOIN chats ON IF (chats.user1_ID=${user1_ID}, chats.user2_ID=users.userID, chats.user1_ID=users.userID)
        WHERE disabled=false AND chats.user1_ID=${user1_ID} OR chats.user2_ID=${user1_ID}`
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
        const decrypted = CryptoJS.AES.decrypt(result[0].msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
        result[0].msg_text = decrypted
        return result[0]
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
        const sql = `SELECT * FROM messages WHERE chatID=${chatID} ORDER BY time_sent DESC LIMIT ${limit} OFFSET ${offset}`  
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        await result.map(msg => {
            const decrypted = CryptoJS.AES.decrypt(msg.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            msg.msg_text = decrypted
        })
        return result
    }
}

export const GET_CHAT = {
    type:ChatType,
    args: {
        chatID: {type: GraphQLInt} 
    },
    async resolve(_, args){
        const {chatID} = args
        const sql = `SELECT * FROM chats WHERE chatID=${chatID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }

}


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
        const sql = `SELECT COUNT(Nid) AS msgCount FROM msg_notifications WHERE receiver_id=${receiver_id}`
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