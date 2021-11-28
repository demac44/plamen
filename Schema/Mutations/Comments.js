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
        let sql = `INSERT INTO comments (commentID ,postID, userID, comment_text, date_commented)
                    VALUES (null,${postID} ,${userID}, "${comment_text}", null)`
        connection.query(sql)
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
        const sql = `DELETE FROM comments WHERE commentID=${commentID}`
        connection.query(sql)
        return args
    } 
}