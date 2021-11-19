import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { StoryType } from "../TypeDefs/Stories.js"

export const CREATE_STORY = {
    type: StoryType,
    args: {
        userID: {type: GraphQLInt},
        url: {type: GraphQLString},
        type: {type:GraphQLString}
    },
    resolve (_, args){
        const {userID, url, type} = args
        const sql = `INSERT INTO stories (storyID, userID, url, date_posted, type)
                    VALUES (null, ${userID}, "${url}", null, "${type}")`
        connection.query(sql)
        return args
    }
}
