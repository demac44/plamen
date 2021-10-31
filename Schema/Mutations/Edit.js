import { GraphQLInt, GraphQLString } from "graphql"
import connection from "../../middleware/db.js"
import { UserType } from "../TypeDefs/Users.js"

export const EDIT_PFP = {
    type: UserType,
    args: {
        userID: {type: GraphQLInt},
        profile_picture:{type: GraphQLString}
    },
    resolve(parent, args) {
        const {userID, profile_picture} = args
        let sql = `UPDATE users SET profile_picture="${profile_picture}" WHERE userID=${userID}`
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
        birth_date: {type: GraphQLString},
        gender: {type: GraphQLString}
    },  
    resolve(parent, args) {
        const {userID, first_name, last_name, username, birth_date, gender} = args
        const sql = `UPDATE users SET first_name="${first_name}", last_name="${last_name}", username="${username}", birth_date=STR_TO_DATE("${birth_date}", "%Y-%m-%d"), gender="${gender}" WHERE userID=${userID}`
        connection.query(sql)
        return userID
    }
}