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
        const sql = `INSERT INTO stories (userID, url, type)
                    VALUES (${userID}, "${url}", "${type}")`
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
    args:{
        sender: {type: GraphQLString},
        receiver: {type: GraphQLString},
        msg_text: {type: GraphQLString},
        username: {type: GraphQLString},
        profile_picture: {type: GraphQLString},
        storyID: {type: GraphQLInt},
        type: {type: GraphQLString}
    },
    async resolve(_, args){
        const {sender, receiver, msg_text, profile_picture, storyID, type} = args
        const encrypted = CryptoJS.AES.encrypt(msg_text, process.env.MESSAGE_ENCRYPTION_KEY)
        const sql = `INSERT INTO messages (sender, receiver, msg_text, storyID, type, url)
                     VALUES ("${sender}", "${receiver}", "${encrypted}", ${storyID}, "${'story-'+type}", "")`
        const msg = await connection.promise().query(sql).then(res=>{return res[0]})
        pubsub.publish('NEW_MESSAGE', {newMessage: {
                                               msg_text, 
                                               type, 
                                               msgID: msg.insertId, 
                                               time_sent: new Date().getTime(),
                                               profile_picture,
                                               storyID,
                                               sender,
                                               receiver
                                           }})
                                           return args
    }
}

export const SEEN_STORY = {
    type: StoryType,
    args: {
        userID: {type: GraphQLInt},
        storyID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID, storyID} = args
        const checkExists = `SELECT * FROM seen_stories WHERE userID=${userID} AND storyID=${storyID} LIMIT 1`
        await connection.promise().query(checkExists).then(res=>{
            if(res[0][0]?.storyID) return null
            else {
                const sql = `INSERT INTO seen_stories (userID, storyID) VALUES (${userID}, ${storyID})`
                connection.query(sql)
                return
            }
        })
        return args
    }
}