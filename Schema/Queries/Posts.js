import { GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import {FeedPostType} from '../TypeDefs/Posts.js'


let temp = []

export const GET_POSTS = {
    type: new GraphQLList(FeedPostType),
    args: {
        userID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },    
    async resolve(_, args) {
        const {userID, limit, offset} = args
        const sql = `SELECT * FROM posts WHERE userID=${userID} ORDER BY date_posted DESC LIMIT ${limit} OFFSET ${offset}`
        const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID`
        const like = `SELECT postID,username,first_name,last_name,profile_picture,users.userID FROM likes JOIN users ON likes.userID=users.userID`
        let r1 = await connection.promise().query(sql).then((res)=>{return res[0]})
        let r2 = await connection.promise().query(comm).then((res)=>{return res[0]})
        let r3 = await connection.promise().query(like).then((res)=>{return res[0]})

        r1.forEach(r => {
            temp = []
            r2.forEach(c => {
                if(c.postID===r.postID) temp.push(c)
            })
            r.comments = temp
        })
        temp=[]
        r1.forEach(r => {
            temp = []
            r3.forEach(l => {
                if(l.postID===r.postID) temp.push(l)
            })
            r.likes = temp
        })

        return r1
    }    
}    
export const GET_FEED_POSTS = {
    type: new GraphQLList(FeedPostType),
    args: {
        userID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },    
    async resolve(_, args) {
        const {userID, limit, offset} = args
        const sql = `SELECT postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture, type FROM posts 
                        JOIN users ON posts.userID=users.userID WHERE (users.userID =${userID} OR users.userID IN 
                        (SELECT followedID FROM followings WHERE followerID=${userID})) 
                        AND DATE(date_posted) > (NOW() - INTERVAL 3 DAY) 
                        ORDER BY date_posted DESC LIMIT ${limit} OFFSET ${offset};`
        const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID`
        const like = `SELECT postID,username,first_name,last_name,profile_picture,users.userID FROM likes JOIN users ON likes.userID=users.userID`
        let r1 = await connection.promise().query(sql).then((res)=>{return res[0]})
        let r2 = await connection.promise().query(comm).then((res)=>{return res[0]})
        let r3 = await connection.promise().query(like).then((res)=>{return res[0]})
        r1.forEach(r => {
            temp = []
            r2.forEach(c => {
                if(c.postID===r.postID) temp.push(c)
            })
            r.comments = temp
        })
        temp=[]
        r1.forEach(r => {
            temp = []
            r3.forEach(l => {
                if(l.postID===r.postID) temp.push(l)
            })
            r.likes = temp
        })
        return r1
    }  
}
export const GET_POST = {
    type: FeedPostType,
    args: {
        postID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {postID} = args
        const sql = `SELECT postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture, type FROM posts JOIN users ON posts.userID=users.userID WHERE posts.postID=${postID}`
        const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID WHERE comments.postID=${postID}`
        const like = `SELECT postID,username,first_name,last_name,profile_picture,users.userID FROM likes JOIN users ON likes.userID=users.userID WHERE likes.postID=${postID}`
        let r1 = await connection.promise().query(sql).then((res)=>{return res[0]})
        let r2 = await connection.promise().query(comm).then((res)=>{return res[0]})
        let r3 = await connection.promise().query(like).then((res)=>{return res[0]})
        temp = []
        r2.forEach(c => {
            temp.push(c)
        })
        r1[0].comments = temp

        temp = []
        r3.forEach(l => {
            temp.push(l)
        })
        r1[0].likes = temp
        return r1[0]
    }

}