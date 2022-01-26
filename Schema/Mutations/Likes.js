import { GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { LikesType } from "../TypeDefs/Likes.js"


export const LIKE_POST = {
    type: LikesType,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt}
    },
    resolve(_, args) {
        const {postID, userID} = args
        connection.query(`
            INSERT INTO likes (userID, postID) 
            VALUES (${userID}, ${postID})
        `)
        return args
    }
}

export const REMOVE_LIKE = {
    type: LikesType,
    args: {
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    resolve(_, args){
        const {postID, userID} = args
        connection.query(`DELETE FROM likes WHERE postID=${postID} AND userID=${userID}`)
        return args
    }
}
