import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { PostType } from "../TypeDefs/Posts.js"

export const CREATE_POST = {
    type: PostType,
    args: {
        userID: {type: GraphQLInt},
        post_text: {type: GraphQLString},
        url: {type: GraphQLString}
    },
    resolve(parent, args) {
        const {userID, post_text, url} = args
        let sql = `INSERT INTO posts (postID, userID, post_text, date_posted, url)
                    VALUES (null, ${userID}, "${post_text}", null, "${url}")`
        connection.query(sql)
        return args
    }
}


export const DELETE_POST = {
    type: PostType,
    args: {
        postID:{type: GraphQLInt}
    },
    resolve(parent, args){
        const {postID} = args
        const sql = `DELETE FROM posts WHERE postID=${postID}`
        connection.query(sql)
        return args
    } 
}