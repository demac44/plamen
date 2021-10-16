import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { UserType } from '../TypeDefs/Users.js';

let users = []
let user = {}


export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve(){
        connection.query('SELECT * FROM users', (err, results)=>{
            if(err) throw err;
            users = results
        })    
        return users
    }    
}    
export const GET_USER = {
    type: UserType,
    args: {
        userID: {type: GraphQLInt}
    },    
    resolve(parent, args) {
        const {userID} = args
        connection.query(`SELECT * FROM users WHERE userID=${userID}`, (err, result)=>{
            if(err) throw err
            user = result[0]    
        }) 
        return user
    }    
}    

