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
        connection.query(`
            INSERT INTO followings (followerID, followedID)
            VALUES (${followerID}, ${followedID})
        `)
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
        connection.query(`DELETE FROM followings WHERE followerID=${followerID} AND followedID=${followedID}`)
        return args
    }
}
