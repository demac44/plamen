import { GraphQLBoolean, GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { UserType } from '../TypeDefs/Users.js';

let count;
let followers = [];
let following = [];
   

export const IF_FOLLOWING = {
    type: GraphQLBoolean,
    args: {
        followerID: {type: GraphQLInt},
        followedID: {type:GraphQLInt}
    },    
    resolve(parent, args) {
        const {followerID, followedID} = args
        let result = connection.query(`SELECT COUNT(*) as ifFollowing FROM followings WHERE followerID=${followerID} AND followedID=${followedID}`)
        return result[0].ifFollowing
    }   
}
 

export const GET_FOLLOWERS = {
    type: new GraphQLList(UserType),
    args: {
        followedID: {type:GraphQLInt}
    },
    resolve(parent, args){
        const {followedID} = args
        const sql = `SELECT userID,username,first_name,last_name,profile_picture FROM users WHERE userID IN (SELECT followerID from followings WHERE followedID=${followedID})`
        let result = connection.query(sql)
        return result
    }
}

export const GET_FOLLOWING = {
    type: new GraphQLList(UserType),
    args: {
        followerID: {type:GraphQLInt}
    },
    resolve(parent, args){
        const {followerID} = args
        let sql = `SELECT userID,username,first_name,last_name,profile_picture FROM users WHERE userID IN (SELECT followedID from followings WHERE followerID=${followerID})`
        let result = connection.query(sql)
        return result
    }
}