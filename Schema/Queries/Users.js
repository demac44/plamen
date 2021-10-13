import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { UserType } from '../TypeDefs/Users.js';
import bcrypt from 'bcrypt'

let users = []
let user = {}
let auth = {}


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

// export const AUTH_USER = {
//     type: UserType,
//     args: {
//         tag_name: {type: GraphQLString},
//         email: {type: GraphQLString},
//         pass: {type: GraphQLString}
//     },
//     resolve(parent, args){
//         connection.query(`SELECT pass FROM users WHERE email="${args.email}"`, (err, result)=>{
//             if (err) throw err;
//             result = JSON.parse(JSON.stringify(result))
//             auth = result
//             bcrypt.compare(args.pass ,auth[0].pass, function(err, isMatch) {
//                 if (err) {
//                   throw err
//                 } else if (!isMatch) {
//                   console.log("Password doesn't match!")
//                 } else {
//                   console.log("Password matches!")
//                 }
//               })
//         })
//         return null
//     }
// }