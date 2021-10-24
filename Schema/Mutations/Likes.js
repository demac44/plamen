import { GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { LikesType } from "../TypeDefs/Likes.js"


export const LIKE_POST = {
    type: LikesType,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt}
    },
    resolve(parent, args) {
        const {postID, userID} = args
        let sql = `INSERT INTO postLikes (likeID, userID, postID) 
                    VALUES (null, ${userID}, ${postID})`
        connection.query(sql)
        return args
    }
}

export const REMOVE_LIKE = {
    type: LikesType,
    args: {
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    resolve(parent, args){
        const {postID, userID} = args
        let sql = `DELETE FROM postLikes WHERE postID=${postID} AND userID=${userID}`
        connection.query(sql)
        return args
    }
}
