import { GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { SavesType } from "../TypeDefs/Saves.js"


export const SAVE_POST = {
    type: SavesType,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt}
    },
    resolve(parent, args) {
        const {postID, userID} = args
        let sql = `INSERT INTO saves (userID, postID) 
                    VALUES (${userID}, ${postID})`
        connection.query(sql, (err, res)=>{
            if (err) throw err                
        })
        return args
    }
}

export const REMOVE_SAVED = {
    type: SavesType,
    args: {
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    resolve(parent, args){
        const {postID, userID} = args
        let sql = `DELETE FROM saves WHERE postID=${postID} AND userID=${userID}`
        connection.query(sql, (err, res)=>{
            if(err) throw err;
        })
        return args
    }
}