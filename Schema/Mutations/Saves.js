import { GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { PostType } from "../TypeDefs/Posts.js"


export const SAVE_POST = {
    type: PostType,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt}
    },
    resolve(_, args) {
        const {postID, userID} = args
        const sql = `INSERT INTO saves (userID, postID) 
                    VALUES (${userID}, ${postID})`
        connection.query(sql)
        return args
    }
}

export const REMOVE_SAVED = {
    type: PostType,
    args: {
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    resolve(_, args){
        const {postID, userID} = args
        const sql = `DELETE FROM saves WHERE postID=${postID} AND userID=${userID}`
        connection.query(sql)
        return args
    }
}