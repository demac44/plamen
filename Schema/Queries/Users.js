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

export const USER_SUGGESTIONS = {
    type: new GraphQLList(UserType),
    args:{
        userID: {type:GraphQLInt},
    },
    async resolve(_, args){
        const {userID} = args
        const userInfo = `SELECT * FROM user_info WHERE userID=${userID}`
        const user_info = await connection.promise().query(userInfo).then(res=>{return res[0][0]})
        const sugg1 = `SELECT first_name,last_name,username,users.userID,profile_picture FROM users
                        JOIN user_info ON users.userID=user_info.userID
                        WHERE 
                            university="${user_info.university}" OR
                            city="${user_info.city}" OR
                            high_school="${user_info.high_school}"
                            AND users.disabled=false
                        ORDER BY RAND() LIMIT 20`

        const result = await connection.promise().query(sugg1).then(res=>{return res[0]})
        if(result.length < 20){
            const additional = `SELECT first_name,last_name,username,users.userID,profile_picture FROM users
                                    JOIN user_info ON users.userID=user_info.userID
                                    WHERE 
                                        (university="${user_info.university}" OR
                                        city="${user_info.city}" OR
                                        high_school="${user_info.high_school}" OR
                                        country="${user_info.country}") 
                                        AND disabled=false
                                        AND users.userID!=${userID}
                                        AND users.userID NOT IN 
                                            (SELECT followedID FROM followings
                                                WHERE followerID=${userID} AND followedID=users.userID)
                                    ORDER BY RAND() LIMIT 20`
            const additional_result = await connection.promise().query(additional).then(res=>{return res[0]})
            console.log(additional_result);
            return additional_result
        }
        return result
    }
}