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
    resolve(parent, args) {
        const {userID, postID, comment_text} = args
        let sql = `INSERT INTO comments (commentID ,postID, userID, comment_text, date_commented)
                    VALUES (null,${postID} ,${userID}, "${comment_text}", null)`
        connection.query(sql)
        return args
    }
}


// export const DELETE_POST = {
//     type: PostType,
//     args: {
//         postID:{type: GraphQLInt}
//     },
//     resolve(parent, args){
//         const {postID} = args
//         const sql = `DELETE FROM posts WHERE postID=${postID}`
//         connection.query(sql, (err, res)=>{
//             if (err) console.log(err);
//         })
//         return args
//     } 
// }