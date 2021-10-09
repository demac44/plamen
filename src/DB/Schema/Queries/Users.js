import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../db.js'
import { UserType } from '../TypeDefs/Users.js';

let users = []
let user = {}

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve(){
        connection.query('SELECT * FROM users', (err, results)=>{
            results = JSON.parse(JSON.stringify(results))
            users = results
            return null;
        })    
        return users
    }    
}    
export const GET_USER = {
    type: UserType,
    args: {
        user_id: {type: GraphQLInt}
    },    
    resolve(parent, args) {
        connection.query(`SELECT * FROM users WHERE user_id=${args.user_id}`, (err, result)=>{
            result = JSON.parse(JSON.stringify(result))
            user = result
            return null;
        })    
        return user[0]
    }    
}    