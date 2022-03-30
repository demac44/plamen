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
            SELECT username,type,profile_picture,date_posted,storyID,url, stories.userID FROM stories 
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
            SELECT stories.userID, username, profile_picture, storyID
            FROM stories 
            JOIN users ON stories.userID=users.userID 
            WHERE disabled=false 
            AND (users.userID=${userID} 
                OR EXISTS (SELECT 1 FROM followings WHERE followerID=${userID} AND followedID=users.userID))
            AND stories.date_posted >= DATE_SUB(NOW(), INTERVAL 1 DAY)
            ORDER BY storyID ASC;
        `).then((res)=>{return res[0]})

        if(users.length>0){
            let uidsSQL = "("
            let userIDs = []
            const uniqueUids = [...new Set(users.map(item => item.userID))]
            users.map(u => userIDs.push({userID: u.userID, storyID: u.storyID}))

            uniqueUids.forEach(uid => uidsSQL+=`${uid},`)
            uidsSQL = uidsSQL.slice(0,-1)
            uidsSQL+=')'
            
    
            const seen = await connection.promise().query(`
                SELECT storyID FROM seen_stories WHERE userID=${userID} AND storyID IN ${uidsSQL}
            `).then(res=>{return res[0]})
    
    
            let unseen = users.filter(s => { return seen.indexOf(s.storyID) == -1; });
    
    
            let storyHeads = []
    
            for(let i=0;i<uniqueUids.length;i++){
                let lastStory = {}
                let usrID = uniqueUids[i]
                for(let j=unseen.length-1;j>=0;j--){
                    if(unseen[j].userID===usrID){
                        let story = users.filter(s => {return s.storyID===unseen[j].storyID})
                        lastStory = {...story[0], storyID: unseen[j].storyID}
                    }
                }
                storyHeads.push(lastStory)
            }
                                
            return [{storyHeads, allStories: sort(users), userIDs}]
        }
        return [{storyHeads: [], allStories: []}]
    }
}

const sort = (objectList) => {
    let sorted = []
    for(let i=0;i<objectList.length;i++){
        let curr = objectList[i].userID
        for(let j=i;j<objectList.length;j++){
            if(objectList[j].userID===curr){sorted.push(objectList[j]);break}
        }
    }
    return sorted
}