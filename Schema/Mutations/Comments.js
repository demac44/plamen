import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import {CommentType} from '../TypeDefs/Comments.js'

export const ADD_COMMENT = {
    type: CommentType,
    args: {
        postID:{type:GraphQLInt},
        userID: {type: GraphQLInt},
        comment_text: {type: GraphQLString},
    },
    resolve(_, args) {
        const {userID, postID, comment_text} = args
        connection.query(`
            INSERT INTO comments (postID, userID, comment_text)
            VALUES (${postID} ,${userID}, "${comment_text}")
        `)
        return args
    }
}


export const REMOVE_COMMENT = {
    type: CommentType,
    args: {
        commentID:{type: GraphQLInt}
    },
    resolve(_, args){
        const {commentID} = args
        connection.query(`DELETE FROM comments WHERE commentID=${commentID}`)
        return args
    } 
}