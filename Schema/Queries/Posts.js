import { GraphQLBoolean, GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { CommentType } from '../TypeDefs/Comments.js';
import { LikesType } from '../TypeDefs/Likes.js';
import {PostType} from '../TypeDefs/Posts.js'


export const GET_PROFILE_POSTS = {
    type: new GraphQLList(PostType),
    args: {
        userID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },   
    async resolve(_, args) {
        const {userID, limit, offset} = args
        const sql = `SELECT postID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,posts.userID 
                     FROM posts
                     JOIN users ON posts.userID=users.userID
                     WHERE posts.userID=${userID} 
                     ORDER BY date_posted DESC 
                     LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
    }
}
export const GET_FEED_POSTS = {
    type: new GraphQLList(PostType),
    args: {
        userID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    }, 
    async resolve(_, args){
        const {userID, limit, offset} = args
        const sql = `SELECT postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,posts.userID
                     FROM posts 
                     JOIN users ON posts.userID=users.userID WHERE (users.userID =${userID} OR users.userID IN 
                     (SELECT followedID FROM followings WHERE followerID=${userID})) 
                     AND DATE(date_posted) > (NOW() - INTERVAL 3 DAY) 
                     ORDER BY date_posted DESC LIMIT ${limit} OFFSET ${offset};`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}
// saved posts
export const GET_SAVED_POSTS    = {
    type: new GraphQLList(PostType),
    args: {
        userID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    }, 
    async resolve(_, args){
        const {userID,limit,offset} = args
        const sql = `SELECT saves.postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,posts.userID
                        FROM saves 
                        JOIN posts ON posts.postID=saves.postID 
                        JOIN users ON users.userID=posts.userID 
                        WHERE saves.userID=${userID} 
                        ORDER BY date_posted DESC 
                        LIMIT ${limit} OFFSET ${offset};`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}
export const IF_SAVED = {
    type: GraphQLBoolean,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID, postID} = args
        const sql = `SELECT EXISTS(SELECT 1 FROM saves WHERE userID=${userID} AND postID=${postID} LIMIT 1) AS ifSaved`
        const result = await connection.promise().query(sql).then((res)=>{return res[0][0]})
        if(result.ifSaved===1) return true
        return false
    }
}
// get random posts
export const RANDOM_POSTS = {
    type: new GraphQLList(PostType),
    async resolve(_, args){
        const sql = `SELECT postID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,posts.userID FROM posts
                     JOIN users ON users.userID=posts.userID
                     ORDER BY RAND() limit 100`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}



// get single post
export const GET_POST = {
    type: PostType,
    args: {
        postID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {postID} = args
        const sql = `SELECT postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture, type 
                        FROM posts JOIN users ON posts.userID=users.userID 
                        WHERE posts.postID=${postID}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result[0]
    }
}
// comments and likes
export const GET_POST_COMMENTS = {
    type: new GraphQLList(CommentType),
    args:{
        postID:{type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset} = args
        const sql = `SELECT commentID,username,comments.userID,comment_text,date_commented,profile_picture,postID FROM comments 
                     JOIN users ON comments.userID=users.userID 
                     WHERE postID=${postID} 
                     ORDER BY date_commented DESC
                     LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}
export const GET_POST_LIKES = {
    type: new GraphQLList(LikesType),
    args:{
        postID:{type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset} = args
        const sql = `SELECT first_name,last_name,users.userID,profile_picture,username
                     FROM likes 
                     JOIN users ON likes.userID=users.userID 
                     WHERE postID=${postID} 
                     LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}

export const IF_LIKED = {
    type: GraphQLBoolean,
    args:{
        postID:{type:GraphQLInt},
        userID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {postID, userID} = args
        const sql = `SELECT EXISTS(SELECT 1 FROM likes WHERE userID=${userID} AND postID=${postID} LIMIT 1) AS ifLiked`
        const result = await connection.promise().query(sql).then(res=>{return res[0][0]})
        if(result.ifLiked===1) return true
        return false
    }
}