import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { StoryType } from "../TypeDefs/Stories.js"
import { ChatMessagesType } from "../TypeDefs/Chat.js"
import { pubsub } from "../../server.js"
import CryptoJS from 'crypto-js'

export const CREATE_STORY = {
    type: StoryType,
    args: {
        userID: {type: GraphQLInt},
        url: {type: GraphQLString},
        type: {type:GraphQLString}
    },
    resolve (_, args){
        const {userID, url, type} = args
        const sql = `INSERT INTO stories (storyID, userID, url, date_posted, type)
                    VALUES (null, ${userID}, "${url}", null, "${type}")`
        connection.query(sql)
        return args
    }
}
export const DELETE_STORY = {
    type: StoryType,
    args: {
        storyID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {storyID} = args
        const sql = `DELETE FROM stories WHERE storyID=${storyID}`
        connection.query(sql)
        return args
    }
}
export const REPLY_TO_STORY = {
    type: ChatMessagesType,
    args: {
        chatID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        msg_text: {type: GraphQLString},
        username: {type: GraphQLString},
        profile_picture: {type: GraphQLString},
        storyID: {type: GraphQLInt},
        type: {type: GraphQLString}
    },
    async resolve(_, args){
        const {chatID, userID, msg_text,username, profile_picture, storyID, type} = args
        const encrypted = CryptoJS.AES.encrypt(msg_text, process.env.MESSAGE_ENCRYPTION_KEY)
        const sql = `INSERT INTO messages (chatID, userID, msg_text, storyID, type, url)
                     VALUES (${chatID}, ${userID}, "${encrypted}", ${storyID}, "${'story-'+type}", "")`
        const msg = await connection.promise().query(sql).then(res=>{return res[0]})
        pubsub.publish('NEW_MESSAGE', {newMessage: {
                                               chatID, 
                                               msg_text, 
                                               userID, 
                                               type, 
                                               msgID: msg.insertId, 
                                               time_sent: new Date().getTime(),
                                               username,
                                               profile_picture,
                                               storyID
                                           }})
                                           return args
    }
}

// export const REPLY_TO_STORY = {
//     type: ChatMessagesType,
//     args: {
//         chatID: {type: GraphQLInt},
//         userID: {type: GraphQLInt},
//         msg_text: {type: GraphQLString},
//         username: {type: GraphQLString},
//         profile_picture: {type: GraphQLString},
//         storyID: {type: GraphQLInt}
//     },
//     async resolve(_, args){
//         const {chatID, userID, msg_text, url, type, username, profile_picture, storyID} = args
//         const encrypted = CryptoJS.AES.encrypt(msg_text, process.env.MESSAGE_ENCRYPTION_KEY)
//         const sql = `INSERT INTO story_replies (chatID, userID, msg_text, url, storyID)
//                      VALUES (${chatID}, ${userID}, "${encrypted}", "${url}", ${storyID})`
//         const msg = await connection.promise().query(sql).then(res=>{return res[0]})
//         pubsub.publish('NEW_MESSAGE', {newMessage: {
//                                         chatID, 
//                                         msg_text, 
//                                         userID, 
//                                         url, 
//                                         type, 
//                                         msgID: msg.insertId, 
//                                         time_sent: new Date().getTime(),
//                                         username,
//                                         profile_picture,
//                                         storyID
//                                         }})
//         return args
//     }
// }
