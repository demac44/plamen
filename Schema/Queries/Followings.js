import { GraphQLBoolean, GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { UserType } from '../TypeDefs/Users.js';


export const IF_FOLLOWING = {
    type: GraphQLBoolean,
    args: {
        followerID: {type: GraphQLInt},
        followedID: {type:GraphQLInt}
    },    
    async resolve(_, args) {
        const {followerID, followedID} = args
        const sql = `SELECT COUNT(1) as ifFollowing FROM followings WHERE followerID=${followerID} AND followedID=${followedID}`
        return await connection.promise().query(sql).then((res)=>{return res[0][0].ifFollowing})
    }   
}
export const GET_FOLLOWERS = {
    type: new GraphQLList(UserType),
    args: {
        followedID: {type:GraphQLInt} 
    },
    async resolve(_, args){
        const {followedID} = args
        const sql = `SELECT
                        userID,
                        username,
                        first_name,
                        last_name,
                        profile_picture
                    FROM
                        users
                    WHERE
                        disabled = FALSE
                    AND EXISTS(
                            SELECT 1 
                            FROM followings 
                            WHERE followedID=${followedID} AND followerID=userID);`
        return await connection.promise().query(sql).then((res)=>{return res[0]})
    }
}
export const GET_FOLLOWING = {
    type: new GraphQLList(UserType),
    args: {
        followerID: {type:GraphQLInt} 
    },
    async resolve(_, args){
        const {followerID} = args
        const sql = `SELECT userID,username,first_name,last_name,profile_picture 
                     FROM users 
                     WHERE disabled=false 
                     AND EXISTS(
                        SELECT 1 
                        FROM followings 
                        WHERE followerID=${followerID} AND followedID=userID);`
        return await connection.promise().query(sql).then((res)=>{return res[0]})
    }
}