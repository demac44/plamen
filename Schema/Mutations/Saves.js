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
        connection.query(`
            INSERT INTO saves (userID, postID) 
            VALUES (${userID}, ${postID})
        `)
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
        connection.query(`DELETE FROM saves WHERE postID=${postID} AND userID=${userID}`)
        return args
    }
}