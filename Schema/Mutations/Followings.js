import { GraphQLInt } from "graphql"
import connection from "../../middleware/db.js"
import { FollowType } from "../TypeDefs/Followings.js"

export const FOLLOW_USER = {
    type: FollowType,
    args: {
        followerID: {type: GraphQLInt},
        followedID:{type:GraphQLInt},
    },
    resolve(_, args) {
        const {followerID, followedID} = args
        const sql = `INSERT INTO followings (followerID, followedID)
                    VALUES (${followerID}, ${followedID})`
        connection.query(sql)
        return args
    }
}

export const UNFOLLOW_USER = {
    type: FollowType,
    args: {
        followerID: {type: GraphQLInt},
        followedID:{type:GraphQLInt},
    },
    resolve(_, args) {
        const {followerID, followedID} = args
        const sql = `DELETE FROM followings WHERE followerID=${followerID} AND followedID=${followedID}`
        connection.query(sql)
        return args
    }
}
