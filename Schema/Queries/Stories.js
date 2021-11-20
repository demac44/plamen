import { GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import {StoryType} from '../TypeDefs/Stories.js'


export const GET_STORIES = {
    type: new GraphQLList(StoryType),
    args: {
        userID: {type:GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        const sql = `SELECT storyID, users.userID, first_name, last_name, profile_picture, username, type
                    FROM stories JOIN users ON stories.userID=users.userID 
                    WHERE (users.userID=${userID} OR users.userID IN 
                        (SELECT followedID FROM followings WHERE followerID=${userID})) 
                        AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                        GROUP BY (users.userID)
                        ORDER BY date_posted DESC;`
        const result = connection.query(sql)
        result.forEach(res => {
            const sql2 = `SELECT storyID, url, type, date_posted FROM stories 
                        JOIN users ON stories.userID=users.userID WHERE stories.userID=${res.userID} 
                        AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY date_posted ASC;`
            const r = connection.query(sql2)
            res.stories = r
        })
        return result
    }
} 

export const GET_USER_STORIES = {
    type: new GraphQLList(StoryType),
    args: {
        userID: {type:GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        const sql = `SELECT storyID, url, type, users.userID, first_name, last_name, profile_picture, username, date_posted FROM stories
                        JOIN users ON stories.userID=users.userID WHERE stories.userID=${userID} AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)`
        const result = connection.query(sql)
        return result
    }
} 