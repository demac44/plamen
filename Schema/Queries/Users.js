import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { UserType } from '../TypeDefs/Users.js';

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    args:{
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt}
    },
    resolve(_, args){
        const {limit, offset} = args
        const result = connection.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`)
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
        const result = connection.query(`SELECT * FROM users WHERE userID=${userID} OR username="${username}"`)
        return result[0]
    }    
}
