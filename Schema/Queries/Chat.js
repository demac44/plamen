import { GraphQLInt, GraphQLList, GraphQLString, subscribe} from 'graphql';
import connection from '../../middleware/db.js'
import { pubsub } from '../schema.js';
import { ChatHeadsType, ChatMessagesType, ChatType } from '../TypeDefs/Chat.js';

export const CHAT_EXISTS = {
    type: ChatHeadsType,
    args: {
        user1: {type: GraphQLInt},
        user2: {type: GraphQLInt}
    },    
    resolve(parent, args) {
        const {user1, user2} = args
        let sql = `SELECT * FROM chats WHERE user1_ID=${user1} AND user2_ID=${user2} OR user1_ID=${user2} AND user2_ID=${user1}` 
        let result = connection.query(sql)
        return result[0]
    }    
}

export const GET_CHAT_HEADS = {
    type: new GraphQLList(ChatHeadsType),
    args:{
        userID: {type: GraphQLInt}
    },
    resolve(parent, args){
        const {userID} = args
        const sql = `
        SELECT first_name, last_name, username, profile_picture, chats.chatID, users.userID, msg_text, messages.userID as mid FROM users 
        JOIN chats ON IF (chats.user1_ID=${userID}, chats.user2_ID=users.userID, chats.user1_ID=users.userID)
        JOIN messages ON messages.chatID=chats.chatID
        WHERE chats.user1_ID=${userID} OR chats.user2_ID=${userID}
        ORDER BY time_sent DESC LIMIT 1`  
        const result = connection.query(sql)
        return result    
    }  
  
}
 
export const GET_MESSAGES = {
    type: new GraphQLList(ChatMessagesType),
    args: {
        chatID: {type: GraphQLInt}
    },
    resolve(parent, args) {
        const {chatID} = args
        const sql = `SELECT * FROM messages WHERE chatID=${chatID}`  
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

