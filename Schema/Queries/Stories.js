import { GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import {StoryType} from '../TypeDefs/Stories.js'

let arr = []

export const GET_STORIES = {
    type: new GraphQLList(StoryType),
    args: {
        userID: {type:GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        arr = []
        const sql = `SELECT storyID, users.userID, first_name, last_name, profile_picture, username, type
                    FROM stories JOIN users ON stories.userID=users.userID 
                    WHERE (users.userID=${userID} OR users.userID IN 
                        (SELECT followedID FROM followings WHERE followerID=${userID})) 
                        GROUP BY (users.userID)
                        ORDER BY date_posted DESC;`
        const result = connection.query(sql)
        result.forEach(res => {
            const sql2 = `SELECT url, type, date_posted FROM stories 
                        JOIN users ON stories.userID=users.userID WHERE stories.userID=${res.userID} ORDER BY date_posted ASC;`
            const r = connection.query(sql2)
            res.stories = r
        })
        return result
    }
} 