import { GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import {StoryType} from '../TypeDefs/Stories.js'


export const GET_STORIES = {
    type: new GraphQLList(StoryType),
    args: {
        userID: {type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT storyID, users.userID, first_name, last_name, profile_picture, username, type
                    FROM stories 
                    JOIN users ON stories.userID=users.userID 
                    WHERE disabled=false 
                    AND (users.userID=${userID} OR users.userID IN 
                        (SELECT followedID FROM followings WHERE followerID=${userID})) 
                        AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                        GROUP BY (users.userID)
                        ORDER BY date_posted DESC;`
        let result = await connection.promise().query(sql).then((res)=>{return res[0]})
        await result.forEach( res => {
            const sql2 = `SELECT storyID, url, type, date_posted FROM stories 
            JOIN users ON stories.userID=users.userID WHERE stories.userID=${res.userID} 
                        AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY date_posted ASC;`
            const r = connection.promise().query(sql2).then((res)=>{return res[0]})
            Object.assign(res, {stories: r})
        })
        return result
    }
} 

export const GET_USER_STORIES = {
    type: new GraphQLList(StoryType),
    args: {
        userID: {type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT storyID, url, type, users.userID, first_name, last_name, profile_picture, username, date_posted FROM stories
                        JOIN users ON stories.userID=users.userID 
                        WHERE disabled=false 
                        AND stories.userID=${userID} 
                        AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
    }
} 

export const GET_STORY_MSG = {
    type: StoryType,
    args:{
        storyID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {storyID} = args
        const sql = `SELECT url FROM stories WHERE storyID=${storyID}`
        const result = await connection.promise().query(sql).then(res=>{return res[0][0]})
        return result
    }
}