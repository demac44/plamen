import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { UserType } from '../TypeDefs/Users.js';

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve(){
        const result = connection.query(`SELECT * FROM users`)
        return result
    }    
}    
export const GET_USER = {
    type: UserType,
    args: {
        userID: {type: GraphQLInt},
        username: {type: GraphQLString}
    },    
    async resolve(parent, args) {
        const {userID, username} = args
        const result = connection.query(`SELECT * FROM users WHERE userID=${userID} OR username="${username}"`)
        return result[0]
    }    
}
