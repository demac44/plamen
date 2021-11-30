import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { GroupType } from "../TypeDefs/Groups.js"

export const GET_GROUPS = {
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

export const GET_GROUP = {
    type: GroupType,
    args:{
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {groupID} = args
        const sql = `SELECT * FROM groups 
                     JOIN group_info ON groups.groupID=group_info.groupID
                     WHERE groups.groupID=${groupID}`
        const posts_sql = `SELECT * FROM group_posts WHERE groupID=${groupID} ORDER BY date_posted DESC`
        const users_sql = `SELECT * FROM group_users
                            JOIN group_roles ON group_users.roleID=group_roles.roleID
                            WHERE groupID=${groupID}`
        const result = connection.query(sql)
        // const posts = connection.query(posts_sql)
        // const users = connection.query(users_sql)
        // result.posts = posts
        // result.users = users 
        return result[0]
    }
}