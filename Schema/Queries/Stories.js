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
            const sql = `SELECT storyID, users.userID, profile_picture, username, type, url, date_posted
                         FROM stories 
                         JOIN users ON stories.userID=users.userID 
                         WHERE disabled=false 
                         AND (users.userID=${userID} 
                             OR EXISTS (SELECT 1 FROM followings WHERE followerID=${userID} AND followedID=users.userID))
                         AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                         ORDER BY storyID ASC;`

            const result = await connection.promise().query(sql).then((res)=>{return res[0]})
            
            let ids = result.map(user => user.userID).filter((value, index, self) => self.indexOf(value) === index)

            let main = [];
            
            for(let i=0;i<ids.length;i++){
                let temp = [];
                result.forEach(story => {
                    story.userID===ids[i] && temp.push(story)
                })
                main.push({
                    username: temp[0]?.username,
                    userID: temp[0].userID,
                    storyID: temp[0].storyID,
                    profile_picture: temp[0].profile_picture,
                    type: temp[0].type,
                    stories: temp
                })
            }

            return main
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
        return await connection.promise().query(sql).then((res)=>{return res[0]})
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
        return await connection.promise().query(sql).then(res=>{return res[0][0]})
    }
}

export const GET_SEEN_STORIES = {
    type: new GraphQLList(StoryType),
    args:{
        userID: {type: GraphQLInt},
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT storyID FROM seen_stories WHERE userID=${userID}`
        return await connection.promise().query(sql).then(res=>{return res[0]})
    }
}