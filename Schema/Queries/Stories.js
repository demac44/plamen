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

            const result = await connection.promise().query(`
                SELECT storyID, users.userID, profile_picture, username, type, url, date_posted
                FROM stories 
                JOIN users ON stories.userID=users.userID 
                WHERE disabled=false 
                AND (users.userID=${userID} 
                    OR EXISTS (SELECT 1 FROM followings WHERE followerID=${userID} AND followedID=users.userID))
                AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                ORDER BY storyID ASC;
            `).then((res)=>{return res[0]})
            
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
        return await connection.promise().query(`
            SELECT storyID, url, type, users.userID, first_name, last_name, profile_picture, username, date_posted FROM stories
            JOIN users ON stories.userID=users.userID 
            WHERE disabled=false 
            AND stories.userID=${userID} 
            AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
        `).then((res)=>{return res[0]})
    }
} 

export const GET_STORY_MSG = {
    type: StoryType,
    args:{
        storyID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {storyID} = args
        return await connection.promise().query(`
            SELECT url FROM stories WHERE storyID=${storyID}
        `).then(res=>{return res[0][0]})
    }
}

export const GET_SEEN_STORIES = {
    type: new GraphQLList(StoryType),
    args:{
        userID: {type: GraphQLInt},
    },
    async resolve(_, args){
        const {userID} = args
        return await connection.promise().query(`
            SELECT storyID FROM seen_stories WHERE userID=${userID}
        `).then(res=>{return res[0]})
    }
}

export const GET_STORY = {
    type: StoryType,
    args:{
        storyID: {type: GraphQLInt},
    },
    async resolve(_, args){
        const {storyID} = args
        return await connection.promise().query(`
            SELECT username,type,profile_picture,date_posted,storyID,url FROM stories 
	    JOIN users ON stories.userID=users.userID
	    WHERE storyID=${storyID}
        `).then(res=>{return res[0][0]})
    }
}


export const GET_STORIES_ALT= {
    type: new GraphQLList(StoryType),
    args: {
        userID: {type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args

        const users = await connection.promise().query(`
            SELECT DISTINCT stories.userID, username, profile_picture
            FROM stories 
            JOIN users ON stories.userID=users.userID 
            WHERE disabled=false 
            AND (users.userID=${userID} 
                OR EXISTS (SELECT 1 FROM followings WHERE followerID=${userID} AND followedID=users.userID))
            AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
            ORDER BY storyID ASC;
        `).then((res)=>{return res[0]})


        let uids = "("

        users.forEach(u => uids+=u.userID+',')
        uids = uids.slice(0,-1)
        uids+=")"
        
        const storiesByUsers = await connection.promise().query(`
            SELECT storyID,userID FROM stories WHERE userID IN ${uids} AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
        `).then((res)=>{return res[0]})


        const seen = await connection.promise().query(`
            SELECT storyID FROM seen_stories WHERE userID=${userID} AND storyID IN ${uids}
        `).then(res=>{return res[0]})


        let unseen = storiesByUsers.filter(s => { return seen.indexOf(s.storyID) == -1; });


        let finalList = []

        for(let i=0;i<users.length;i++){
            let last = {}
            let usr = users[i].userID
            for(let j=unseen.length-1;j>=0;j--){
                if(unseen[j].userID===usr){
                    last = {...users[i], storyID: unseen[j].storyID}
                    break
                }
            }
            if(last==={}){
                for(let k=0;k<storiesByUsers.length;i++){
                    if(s.userID===usr) {
                        finalList.push(storiesByUsers[k]) // need to get username and profile picture
                        break
                    }
                }
            }
            else finalList.push(last)
        }
        
                
        return finalList
    }
}
