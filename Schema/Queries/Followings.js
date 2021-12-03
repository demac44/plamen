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
        const sql = `SELECT COUNT(*) as ifFollowing FROM followings WHERE followerID=${followerID} AND followedID=${followedID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0].ifFollowing
    }   
}
export const GET_FOLLOWERS = {
    type: new GraphQLList(UserType),
    args: {
        followedID: {type:GraphQLInt} 
    },
    async resolve(_, args){
        const {followedID} = args
        const sql = `SELECT userID,username,first_name,last_name,profile_picture FROM users WHERE userID IN (SELECT followerID from followings WHERE followedID=${followedID})`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
    }
}
export const GET_FOLLOWING = {
    type: new GraphQLList(UserType),
    args: {
        followerID: {type:GraphQLInt} 
    },
    async resolve(_, args){
        const {followerID} = args
        const sql = `SELECT userID,username,first_name,last_name,profile_picture FROM users WHERE userID IN (SELECT followedID from followings WHERE followerID=${followerID})`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
    }
}