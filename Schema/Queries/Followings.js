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
        connection.query(`SELECT COUNT(*) as ifFollowing FROM followings WHERE followerID=${followerID} AND followedID=${followedID}`, (err, result)=>{
            if(err) throw err
            count = result[0].ifFollowing
        }) 
        return count 
    }   
}
 

export const GET_FOLLOWERS = {
    type: new GraphQLList(UserType),
    args: {
        followedID: {type:GraphQLInt}
    },
    resolve(parent, args){
        const {followedID} = args
        let sql = `SELECT userID,username,first_name,last_name,profile_picture FROM users WHERE userID IN (SELECT followerID from followings WHERE followedID=${followedID})`
        connection.query(sql, (err, result)=>{
            if (err) throw err;
            followers = result
        })
        return followers
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
        connection.query(sql, (err, result)=>{
            if (err) throw err;
            following = result
        })
        return following
    }
}