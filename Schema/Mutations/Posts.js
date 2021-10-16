import { GraphQLString, GraphQLInt, GraphQLBoolean } from "graphql"
import connection from "../../middleware/db.js"
import { TextPostType } from "../TypeDefs/Posts.js"

export const CREATE_TEXT_POST = {
    type: TextPostType,
    args: {
        userID: {type: GraphQLInt},
        post_content: {type: GraphQLString},
    },
    resolve(parent, args) {
        const {userID, post_content} = args
        let sql = `INSERT INTO textposts (tpostID, userID, post_content, date_published, updated, date_updated)
                    VALUES (null, ${userID}, "${post_content}", null, false, null)`
        connection.query(sql, (err, res)=>{
            if (err) throw err                
        })
        return args
    }
}


export const DELETE_POST = {
    type: TextPostType,
    args: {
        tpostID:{type: GraphQLInt}
    },
    resolve(parent, args){
        const {tpostID} = args
        const sql = `DELETE FROM textposts WHERE tpostID=${tpostID}`
        connection.query(sql, (err, res)=>{
            if (err) console.log(err);
        })
        return args
    } 
}