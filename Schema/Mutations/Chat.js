import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { ChatMessagesType, ChatType } from "../TypeDefs/Chat.js"
import { pubsub } from '../schema.js';


export const CREATE_CHAT = {
    type: ChatType,
    args: {
        user1_ID: {type: GraphQLInt},
        user2_ID: {type: GraphQLInt},
    },
    resolve(_, args) {
        let {user1_ID, user2_ID} = args
        const sql = `INSERT INTO chats (chatID, user1_ID, user2_ID, date_created)
        VALUES (null, ${user1_ID}, ${user2_ID}, null)`
        const res = connection.query(sql)
        args.chatID=res.insertId
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
        type: {type:GraphQLString}
    },
    resolve(_, args){
        const {chatID, userID, msg_text, url, type} = args
        const sql = `INSERT INTO messages (msgID, chatID, userID, time_sent, msg_text, url, type)
                     VALUES (null, ${chatID}, ${userID}, null, "${msg_text}", "${url}", "${type}")`
        const msg = connection.query(sql) 
        pubsub.publish('NEW_MESSAGE', {newMessage: {chatID, msg_text, userID, url, type, msgID: msg.insertId}})  
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