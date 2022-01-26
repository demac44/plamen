import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { PostType } from "../TypeDefs/Posts.js"

export const CREATE_POST = {
    type: PostType,
    args: {
        userID: {type: GraphQLInt},
        post_text: {type: GraphQLString},
        url: {type: GraphQLString},
        type:{type:GraphQLString}
    },
    async resolve (_, args){
        const {userID, post_text, url, type} = args
        const result = connection.promise().query(`
            INSERT INTO posts (userID, post_text, url, type)
            VALUES (${userID}, "${post_text}", "${url}", "${type}")
        `).then(res=>{return res[0].insertId})
        return {postID: result}
    }
}
export const DELETE_POST = {
    type: PostType,
    args: {
        postID:{type: GraphQLInt}
    },
    resolve(_, args){
        const {postID} = args
        connection.query(`DELETE FROM posts WHERE postID=${postID}`)
        return args
    } 
}