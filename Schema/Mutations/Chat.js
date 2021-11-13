import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { ChatMessagesType, CreateChatType } from "../TypeDefs/Chat.js"
import { pubsub } from '../schema.js';


export const CREATE_CHAT = {
    type: CreateChatType,
    args: {
        user1: {type: GraphQLInt},
        user2: {type: GraphQLInt},
        chatID: {type: GraphQLInt}
    },
    resolve(parent, args) {
        let {user1, user2, chatID} = args
        const sql = `INSERT INTO chats (chatID, user1_ID, user2_ID, date_created)
        VALUES (null, ${user1}, ${user2}, null)`
        const res = connection.query(sql)
        args.chatID=res.insertId
        return args
    }
}

export const DELETE_CHAT = {
    type: CreateChatType,
    args:{
        chatID:{type:GraphQLInt}
    },
    resolve(parent , args){
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
        url: {type: GraphQLString}
    },
    resolve(parent, args){
        const {chatID, userID, msg_text, url} = args
        const sql = `INSERT INTO messages (msgID, chatID, userID, time_sent, msg_text, url)
                     VALUES (null, ${chatID}, ${userID}, null, "${msg_text}", "${url}")`
        connection.query(sql) 
        pubsub.publish('NEW_MESSAGE', {newMessage: {chatID, msg_text, userID, url, msgID:Math.floor(Math.random()*1000)}})  
        return args
    }
}
