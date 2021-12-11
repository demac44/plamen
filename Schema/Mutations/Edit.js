import { GraphQLInt, GraphQLString } from "graphql"
import connection from "../../middleware/db.js"
import { PasswordType, UserType } from "../TypeDefs/Users.js"
import bcrypt from 'bcrypt'


export const EDIT_PFP = {
    type: UserType,
    args: {
        userID: {type: GraphQLInt},
        profile_picture:{type: GraphQLString}
    },
    resolve(_, args) {
        const {userID, profile_picture} = args
        const sql = `UPDATE users SET profile_picture="${profile_picture}" WHERE userID=${userID}`
        connection.query(sql)
        return args
    }
}

export const EDIT_INFO = {
    type: UserType,
    args: {
        userID: {type: GraphQLInt},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        username: {type: GraphQLString},
    },  
    resolve(_, args) {
        const {userID, first_name, last_name, username} = args
        const sql = `UPDATE users SET 
                        first_name="${first_name}", 
                        last_name="${last_name}", 
                        username="${username}"
                        WHERE userID=${userID}`
        connection.query(sql)
        return userID
    }
}

let changed = false
let error = null;

export const CHANGE_PASSWORD = {
    type: PasswordType,
    args:{
        oldPassword: {type: GraphQLString},
        newPassword: {type: GraphQLString},
        userID: {type: GraphQLInt},
    },
    async resolve(_, args){
        const {oldPassword, newPassword, userID} = args
        const getOldPass = `SELECT pass FROM users WHERE userID=${userID}`
        const oldPass = await connection.promise().query(getOldPass).then(res=>{return res[0][0]})
        const validPassword = await bcrypt.compare(oldPassword, oldPass.pass)
        if(!validPassword) {
            error = 'Invalid password'
            return {changed, error}
        } else {
            try {
                bcrypt.genSalt(10, (_, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if(err) return err;
                        const newPass = `UPDATE users SET pass="${hash}" WHERE userID=${userID}`
                        connection.query(newPass)
                        changed = true
                        return
                    })
                })
                
            } catch (error) {
                
            }
        }
        return {changed, error}
    }
}


