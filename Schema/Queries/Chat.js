import { GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import { ChatListType, ChatMessagesType, ChatType } from '../TypeDefs/Chat.js';

export const CHAT_EXISTS = {
    type: ChatType,
    args: {
        user1_ID: {type: GraphQLInt},
        user2_ID: {type: GraphQLInt}
    },    
    resolve(_, args) {
        const {user1_ID, user2_ID} = args
        let sql = `SELECT * FROM chats WHERE user1_ID=${user1_ID} AND user2_ID=${user2_ID} OR user1_ID=${user2_ID} AND user2_ID=${user1_ID}` 
        let result = connection.query(sql)
        return result[0]
    }    
}

export const GET_CHAT_LIST = {
    type: new GraphQLList(ChatListType),
    args:{
        user1_ID: {type: GraphQLInt}
    },
    resolve(_, args){
        const {user1_ID} = args
        const sql = `
        SELECT first_name, last_name, username, profile_picture, chats.chatID, users.userID, date_created FROM users 
        JOIN chats ON IF (chats.user1_ID=${user1_ID}, chats.user2_ID=users.userID, chats.user1_ID=users.userID)
        WHERE chats.user1_ID=${user1_ID} OR chats.user2_ID=${user1_ID}`
        const result = connection.query(sql)
        result.forEach(res => {
            const sql2 = `SELECT msg_text, userID as mid, type FROM messages WHERE chatID=${res.chatID} ORDER BY time_sent DESC LIMIT 1`
            const msg = connection.query(sql2)
            msg[0]?.msg_text ? (res.msg_text = msg[0].msg_text) : res.msg_text = null
            msg[0]?.mid ? (res.mid = msg[0].mid) : res.mid = null
            msg[0]?.type ?(res.type = msg[0].type) : res.type = null
        })
        return result    
    }  

}
 
export const GET_MESSAGES = {
    type: new GraphQLList(ChatMessagesType),
    args: {
        chatID: {type: GraphQLInt}
    },
    resolve(_, args) {
        const {chatID} = args
        const sql = `SELECT * FROM messages WHERE chatID=${chatID} ORDER BY time_sent DESC`  
        const result = connection.query(sql)
        return result
    }
}

export const GET_CHAT = {
    type:ChatType,
    args: {
        chatID: {type: GraphQLInt} 
    },
    resolve(_, args){
        const {chatID} = args
        const sql = `SELECT * FROM chats WHERE chatID=${chatID}`
        const result = connection.query(sql)
        return result[0]
    }

}


export const GET_CHAT_MEDIA = {
    type: new GraphQLList(ChatMessagesType),
    args:{
        chatID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {chatID} = args
        const sql = `SELECT msgID, userID, url, type FROM messages WHERE chatID=${chatID} AND type="image" OR type="video"`
        const result = connection.query(sql)
        return result
    }
}