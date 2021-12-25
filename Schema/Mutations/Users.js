import { GraphQLInt, GraphQLString } from "graphql"
import connection from "../../middleware/db.js"
import { BlockUserType, PasswordType, UserInfoType, UserType } from "../TypeDefs/Users.js"
import bcrypt from 'bcrypt'

export const SET_LAST_SEEN = {
    type: UserType,
    args: {
        userID: {type: GraphQLInt}
    },
    resolve (_, args){
        const {userID} = args
        const sql = `UPDATE users SET last_seen=NOW() WHERE userID=${userID}`
        connection.query(sql)
        return args
    }
}

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
            if(err) return err
            bcrypt.hash(pass, salt, (err, hash) => {
                if(err) return err
                const sql = `INSERT INTO users (user_id, tag_name, first_name, last_name, email, pass, birth_date, date_registered, pfp_url)
                            VALUES (null, "${tag_name}", "${first_name}", "${last_name}", "${email}", "${hash}", STR_TO_DATE("${birth_date}", "%Y-%m-%d"), null, "${pfp_url}")`
                connection.query(sql)
            })
        })
        return args
    }
}

// account settings

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

// user info settings


export const EDIT_INTERESTS = {
    type: UserInfoType,
    args:{
        userID: {type: GraphQLInt},
        interests: {type: GraphQLString}
    },
    resolve(_, args){
        const {userID, interests} = args
        const sql = `UPDATE user_info SET interests="${interests}" WHERE userID=${userID}`
        connection.query(sql)
        return args
    }
}

export const EDIT_USER_INFO = {
    type: UserInfoType,
    args:{
        userID: {type: GraphQLInt},
        job: {type: GraphQLString},
        university: {type: GraphQLString},
        high_school: {type: GraphQLString},
        phone_number: {type: GraphQLString},
        country: {type: GraphQLString},
        city: {type: GraphQLString},
    },
    resolve(_, args){
        const {userID, job, university, high_school, phone_number, country, city} = args
        const sql = `UPDATE user_info 
                        SET job="${job}",
                            university="${university}",
                            high_school="${high_school}",
                            phone_number="${phone_number}",
                            country="${country}",
                            city="${city}"
                        WHERE userID=${userID}`
        connection.query(sql)
        return args
    }
}

export const EDIT_BDATE= {
    type: UserInfoType,
    args:{
        userID: {type: GraphQLInt},
        bDate: {type: GraphQLString}
    },
    async resolve(_, args){
        const {userID, bDate} = args
        const ifChanged = `SELECT bDate_changed, bDate FROM user_info WHERE userID=${userID}`
        const sql = `UPDATE user_info 
                        SET 
                            bDate=STR_TO_DATE("${bDate}", "%Y-%m-%d"),
                            bDate_changed=true 
                        WHERE userID=${userID}`
        const result = await connection.promise().query(ifChanged).then(res=>{return res[0][0]})
        if(result.bDate_changed===0){
            connection.query(sql)
            return {error: null}
        } else if (result.bDate_changed===1) return {error: "You already changed you birth date once!"}
    }
}

export const EDIT_GENDER= {
    type: UserInfoType,
    args:{
        userID: {type: GraphQLInt},
        gender: {type: GraphQLString}
    },
    async resolve(_, args){
        const {userID, gender} = args
        const ifChanged = `SELECT gender_changed, gender FROM user_info WHERE userID=${userID}`
        const sql = `UPDATE user_info 
                        SET 
                            gender="${gender}",
                            gender_changed=true 
                        WHERE userID=${userID}`
        const result = await connection.promise().query(ifChanged).then(res=>{return res[0][0]})
        if(result.gender_changed===0){
            if(result.gender===gender) return {error: `Your gender is already set as ${gender}`}
            else {
                connection.query(sql)
                return {error: null}
            }
        } else if (result.gender_changed===1) return {error: "You already changed you gender once!"}
    }
}

export const BLOCK_USER = {
    type: BlockUserType,
    args:{
        blockerId: {type: GraphQLInt},
        blockedId: {type: GraphQLInt}
    },
    resolve(_, args){
        const {blockedId, blockerId} = args
        const sql = `INSERT INTO blocked_users (blockerId, blockedId) 
                     VALUES (${blockerId}, ${blockedId})`
        connection.query(sql)
        return args
    }
}

export const UNBLOCK_USER = {
    type: BlockUserType,
    args:{
        blockerId: {type: GraphQLInt},
        blockedId: {type: GraphQLInt}
    },
    resolve(_, args){
        const {blockedId, blockerId} = args
        const sql = `DELETE FROM blocked_users WHERE ${blockerId} AND ${blockedId}`
        connection.query(sql)
        return args
    }
}