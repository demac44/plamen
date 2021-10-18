import { GraphQLInt } from "graphql"
import connection from "../../middleware/db.js"
import { FollowType } from "../TypeDefs/Followings.js"

export const FOLLOW_USER = {
    type: FollowType,
    args: {
        followerID: {type: GraphQLInt},
        followedID:{type:GraphQLInt},
    },
    resolve(parent, args) {
        const {followerID, followedID} = args
        let sql = `INSERT INTO followings (follID, followerID, followedID)
                    VALUES (null, ${followerID}, ${followedID})`
        connection.query(sql, (err, res)=>{
            if (err) throw err
        })
        return args
    }
}

