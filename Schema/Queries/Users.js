import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { UserInfoType, UserType } from '../TypeDefs/Users.js';

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    args:{
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt}
    },
    async resolve(_, args){
        const {limit, offset} = args
        const sql = `SELECT * FROM users WHERE disabled=false LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
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
        const sql = `SELECT * FROM users WHERE disabled=false AND username="${username}"`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
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
        const result = await connection.promise().query(sql).then(res=>{return res[0][0]})
        return result
    }
}