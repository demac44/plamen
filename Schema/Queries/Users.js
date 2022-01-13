import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { UserInfoType, UserType } from '../TypeDefs/Users.js';

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    args:{
        userID: {type: GraphQLInt},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt}
    },
    async resolve(_, args){
        const {limit, offset, userID} = args
        const sql = `SELECT * FROM users 
                     WHERE disabled=false 
                     AND NOT EXISTS (
                        (SELECT 1
                        FROM blocked_users
                        WHERE (blockedId = ${userID} AND blockerId =userID)
                     ))
                     LIMIT ${limit} OFFSET ${offset}`
        return await connection.promise().query(sql).then((res)=>{return res[0]})
    }    
}    
export const GET_USER = {
    type: UserType,
    args: {
        userID: {type: GraphQLInt},
        username: {type: GraphQLString}
    },    
    async resolve(_, args) {
        const {userID, username} = args
        const sql = `SELECT username,first_name, last_name, profile_picture, userID, last_seen, show_status FROM users 
                     WHERE disabled=false
                     AND username="${username}"
                     AND NOT EXISTS (
                        (SELECT 1
                        FROM blocked_users
                        WHERE (blockedId = ${userID} AND blockerId =userID)
                        )
                    ) `
        return await connection.promise().query(sql).then((res)=>{return res[0][0]})
    }    
}

export const CHECK_EMAIL_CONFIRMED = {
    type: GraphQLBoolean,
    args: {
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT email_confirmed FROM users WHERE userID=${userID}`
        return await connection.promise().query(sql).then(res => {return res[0][0].email_confirmed===1 ? true : false})
    }
}

export const GET_USER_INFO = {
    type: UserInfoType,
    args: {
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT * FROM user_info WHERE userID=${userID}`
        return await connection.promise().query(sql).then(res=>{return res[0][0]})
    }
}

export const GET_USER_INTERESTS = {
    type: new GraphQLList(UserInfoType),
    args:{
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT interest FROM user_interests WHERE userID=${userID}`
        return await connection.promise().query(sql).then(res=>{return res[0]})
    }
}

export const IF_USER_BLOCKED = {
    type: GraphQLBoolean,
    args:{
        blockerId: {type: GraphQLInt},
        blockedId: {type: GraphQLInt}
    },
    async resolve (_, args){
        const {blockedId, blockerId} = args
        const sql = `SELECT EXISTS(SELECT 1 FROM blocked_users WHERE blockerId=${blockerId} AND blockedId=${blockedId} LIMIT 1) AS isBlocked`
        return await connection.promise().query(sql).then(res=>{return res[0][0].isBlocked===1 ? true : false})
    }
}

export const GET_BLOCKED_USERS = {
    type: new GraphQLList(UserType),
    args: {
        userID:{type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT first_name,last_name,username,profile_picture,blockedId as userID FROM blocked_users
                     JOIN users ON blockedId=users.userID 
                     WHERE blockerId=${userID} AND disabled=false`
        return await connection.promise().query(sql).then(res=>{return res[0]})
    }
}
export const COUNT_POSTS = {
    type: GraphQLInt,
    args: {
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT COUNT(1) as noOfPosts FROM posts WHERE userID=${userID}`
        return await connection.promise().query(sql).then(res=>{return res[0][0]?.noOfPosts})
    }
}