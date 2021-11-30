import { GraphQLInt, GraphQLString, GraphQLBoolean} from "graphql"
import connection from "../../middleware/db.js"
import { GroupType } from "../TypeDefs/Groups.js"


export const CREATE_GROUP = {
    type: GroupType,
    args: {
        group_name: {type: GraphQLString},
        group_creator_id: {type: GraphQLInt},
        closed: {type:GraphQLBoolean},
        group_description: {type:GraphQLString},
        group_tags: {type:GraphQLString}
    },
    resolve(_, args) {
        const {group_name, group_creator_id, closed, group_description, group_tags} = args
        const sql = `INSERT INTO groups (groupID, group_name, group_creator_id, date_created, closed) 
                    VALUES (null, "${group_name}", ${group_creator_id}, null, ${closed})`
        const res = connection.query(sql)
        const sql2 = `INSERT INTO group_info (groupID, group_description, group_tags)
                        VALUES (${res.insertId}, "${group_description}", "${group_tags}")`
        const sql3 = `INSERT INTO group_users (groupID, userID, roleID, date_joined)
                        VALUES (${res.insertId}, ${group_creator_id}, 1, null)`
        connection.query(sql2)
        connection.query(sql3)
        return args
    }
}