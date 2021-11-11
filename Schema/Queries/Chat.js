import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString} from 'graphql';
import connection from '../../middleware/db.js'
import { ChatHeadsType, ChatMessagesType } from '../TypeDefs/Chat.js';

export const CHAT_EXISTS = {
    type: ChatHeadsType,
    args: {
        chatID: {type: GraphQLString},
        chatID2: {type: GraphQLString}
    },    
    resolve(parent, args) {
        const {chatID, chatID2} = args
        let sql = `SELECT chatID FROM chats WHERE chatID="${chatID}" OR chatID="${chatID2}"` 
        let result = connection.query(sql)
        return result[0]
    }   
}
 
let arr = [] 

export const GET_CHAT_HEADS = {
    type: new GraphQLList(ChatHeadsType),
    args:{
        userID: {type: GraphQLInt}
    },
    resolve(parent, args){
        const {userID} = args
        arr = []
        const sql = `SELECT chatID from participants WHERE userID=${userID}`
        const result = connection.query(sql)
        result.forEach(res => {
            let c = connection.query(`SELECT first_name, last_name, profile_picture, chatID, users.userID
                                    FROM participants JOIN users ON participants.userID=users.userID
                                    WHERE participants.chatID=${res.chatID} AND participants.userID NOT LIKE ${userID}`)
            arr.push(c[0])
        })
        return arr
    }

}

export const GET_MESSAGES = {
    type: new GraphQLList(ChatMessagesType),
    args: {
        chatID: {type: GraphQLString}
    },
    resolve(parent, args) {
        const {chatID} = args
        const sql = `SELECT * FROM messages WHERE chatID="${chatID}"`
        const result = connection.query(sql)
        return result
    }
}