import { GraphQLString, GraphQLInt} from "graphql"
import connection from "../../middleware/db.js"
import { StoryType } from "../TypeDefs/Stories.js"

export const CREATE_STORY = {
    type: StoryType,
    args: {
        userID: {type: GraphQLInt},
        url: {type: GraphQLString}
    },
    resolve (parent, args){
        const {userID, time_posted, url} = args
        let sql = `INSERT INTO stories (id, userID, url, time_posted)
                    VALUES (null, ${userID}, "${url}", null)`
        connection.query(sql)
        return args
    }
}
