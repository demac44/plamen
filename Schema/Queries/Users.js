import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { UserType } from '../TypeDefs/Users.js';

let users = []
let user = {}


export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve(){
        let result = connection.query('SELECT * FROM users')
        return result[0]
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
        let result = connection.query(`SELECT * FROM users WHERE userID=${userID} OR username="${username}"`)
        return result[0]
    }    
}
