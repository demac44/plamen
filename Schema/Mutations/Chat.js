import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { ChatMessagesType, CreateChatType } from "../TypeDefs/Chat.js"
import { pubsub } from '../schema.js';


export const CREATE_CHAT = {
    type: CreateChatType,
    args: {
        chatID: {type: GraphQLString},
        userID: {type: GraphQLInt},
        second_userID: {type: GraphQLInt}
    },
    resolve(parent, args) {
        const {chatID, userID, second_userID} = args
        const sql = `INSERT INTO chats (chatID, messages, participants, date_created) VALUES ("${chatID}", null, null, null)`
        const sql2 = `INSERT INTO participants (userID, chatID, date_joined) VALUES (${userID}, "${chatID}", null)`
        const sql3 = `INSERT INTO participants (userID, chatID, date_joined) VALUES (${second_userID}, "${chatID}", null);`
        connection.query(sql)
        connection.query(sql2)
        connection.query(sql3)
        return args
    }
}

export const SEND_MESSAGE = {
    type: ChatMessagesType,
    args: {
        chatID: {type: GraphQLString},
        userID: {type: GraphQLInt},
        msg_text: {type: GraphQLString},
        url: {type: GraphQLString}
    },
    resolve(parent, args){
        const {chatID, userID, msg_text, url} = args
        const sql = `INSERT INTO messages (msgID, chatID, userID, time_sent, msg_text, url)
                     VALUES (null, "${chatID}", ${userID}, null, "${msg_text}", "${url}")`
        connection.query(sql) 
        pubsub.publish('NEW_MESSAGE', {newMessage: args}) 
        return args
    }
}