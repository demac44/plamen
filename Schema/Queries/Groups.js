import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { GroupType } from "../TypeDefs/Groups.js"

export const GET_GROUPS= {
    type: new GraphQLList(GroupType),
    args:{
        userID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        const sql = `SELECT group_name, group_users.groupID FROM group_users JOIN groups ON group_users.groupID=groups.groupID WHERE group_users.userID=${userID}`
        const result = connection.query(sql)
        return result
    }    
}    
