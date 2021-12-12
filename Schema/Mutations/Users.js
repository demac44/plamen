import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql"
import connection from "../../middleware/db.js"
import { PasswordType, UserType } from "../TypeDefs/Users.js"
import bcrypt from 'bcrypt'

export const CREATE_USER = {
    type: UserType,
    args: {
        tag_name: {type: GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        email:{type:GraphQLString},
        pass:{type:GraphQLString},
        birth_date: {type: GraphQLString},
        pfp_url: {type: GraphQLString}
    },
    resolve(parent, args) {
        const {tag_name, first_name, last_name, email, pass, birth_date, pfp_url} = args
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                const sql = `INSERT INTO users (user_id, tag_name, first_name, last_name, email, pass, birth_date, date_registered, pfp_url)
                            VALUES (null, "${tag_name}", "${first_name}", "${last_name}", "${email}", "${hash}", STR_TO_DATE("${birth_date}", "%Y-%m-%d"), null, "${pfp_url}")`
                connection.query(sql)
            })
        })
        return args
    }
}

export const DISABLE_ACCOUNT = {
    type: PasswordType,
    args:{
        userID: {type: GraphQLInt},
        password: {type: GraphQLString}
    },
    async resolve(_, args){
        const {userID, password} = args
        const getPass = `SELECT pass FROM users WHERE userID=${userID}`
        const pass = await connection.promise().query(getPass).then(res=>{return res[0][0]})
        const validPassword = await bcrypt.compare(password, pass.pass)
        if(validPassword){
            const sql = `UPDATE users SET disabled=true WHERE userID=${userID}`
            connection.query(sql)
            return {error: null}
        }
        else {
            return {error: 'Invalid password'}
        }
    }
}
export const DELETE_ACCOUNT = {
    type: PasswordType,
    args:{
        userID: {type: GraphQLInt},
        password: {type: GraphQLString}
    },
    async resolve(_, args){
        const {userID, password} = args
        const getPass = `SELECT pass FROM users WHERE userID=${userID}`
        const pass = await connection.promise().query(getPass).then(res=>{return res[0][0]})
        const validPassword = await bcrypt.compare(password, pass.pass)
        if(validPassword){
            const sql = `DELETE FROM users WHERE userID=${userID}`
            connection.query(sql)
            return {error: null}
        }
        else {
            return {error: 'Invalid password'}
        }
    }
}

export const UNDISABLE_ACCOUNT = {
    type: UserType,
    args:{
        userID: {type: GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        const sql = `UPDATE users SET disabled=false WHERE userID=${userID}`
        connection.query(sql)
        return args
    }
}

