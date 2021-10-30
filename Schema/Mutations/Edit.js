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
