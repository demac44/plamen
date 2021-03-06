import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString} from 'graphql';
import connection from '../../middleware/db.js'
import { CommentType } from '../TypeDefs/Comments.js';
import { LikesType } from '../TypeDefs/Likes.js';
import {PostType} from '../TypeDefs/Posts.js'


export const GET_PROFILE_POSTS = {
    type: new GraphQLList(PostType),
    args: {
        userID: {type: GraphQLInt},
        username: {type: GraphQLString},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },   
    async resolve(_, args) {
        const {limit, offset, username} = args
        return await connection.promise().query(`
            SELECT postID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,posts.userID, width, height
            FROM posts
            JOIN users ON posts.userID IN (SELECT userID FROM users WHERE username="${username}")
            WHERE username="${username}"
            ORDER BY postID DESC  
            LIMIT ${limit} OFFSET ${offset}
        `).then((res)=>{return res[0]})
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
        return await connection.promise().query(`
            SELECT postID,users.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type, width, height
            FROM posts 
            JOIN users ON posts.userID=users.userID 
            WHERE users.userID=${userID} OR
            EXISTS (SELECT 1 FROM followings WHERE followerID=${userID} AND followedID=users.userID)
            ORDER BY postID DESC
            LIMIT ${limit} OFFSET ${offset};
        `).then(res=>{return res[0]})
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
        return await connection.promise().query(`
            SELECT
                saves.postID,
                posts.userID,
                post_text,
                date_posted,
                url,
                username,
                first_name,
                last_name,
                profile_picture,
                type,
                posts.userID,
 		width, 
		height
            FROM
                saves
            JOIN posts ON posts.postID = saves.postID
            JOIN users ON users.userID = posts.userID
            WHERE
                disabled = FALSE 
                AND NOT EXISTS (
                    (SELECT 1
                    FROM blocked_users
                    WHERE
                        (blockerId = ${userID} AND blockedId = users.userID)
                            OR
                        (blockerId = users.userID AND blockedId = ${userID})
                    )
                ) 
                AND saves.userID = ${userID}
                ORDER BY postID DESC 
                LIMIT ${limit} OFFSET ${offset};
        `).then(res=>{return res[0]})
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
        return await connection.promise().query(sql).then((res)=>{return res[0][0].ifSaved===1 ? true : false})
    }
}
// get random posts
export const RANDOM_POSTS = {
    type: new GraphQLList(PostType),
    args:{
        userID: {type:GraphQLInt},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID, limit, offset} = args
        return await connection.promise().query(`
            SELECT postID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,posts.userID, width, height 
	    FROM posts
            JOIN users ON users.userID=posts.userID
            WHERE disabled=false
            AND NOT EXISTS (
            (SELECT 1
            FROM blocked_users
            WHERE
                (blockerId = ${userID} AND blockedId = users.userID)
                    OR
                (blockerId = users.userID AND blockedId = ${userID})
            )
            ) 
            LIMIT ${limit} OFFSET ${offset}
        `).then(res=>{return res[0]})
    }
}
                
// get single post
export const GET_POST = {
    type: PostType,
    args: {
        postID:{type:GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        let {postID, userID} = args
        if(!userID) userID=0
        return await connection.promise().query(`
            SELECT postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture, type 
            FROM posts 
            JOIN users ON posts.userID=users.userID 
            AND NOT EXISTS (
                (SELECT 1
                FROM blocked_users
                WHERE
                    (blockerId = ${userID} AND blockedId = users.userID)
                        OR
                    (blockerId = users.userID AND blockedId = ${userID})
                )
            ) 
            WHERE disabled=false 
            AND posts.postID=${postID}
        `).then(res=>{return res[0][0]})
    }
}
// comments and likes
export const GET_POST_COMMENTS = {
    type: new GraphQLList(CommentType),
    args:{
        postID:{type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset, userID} = args
        return await connection.promise().query(`
            SELECT commentID,username,comments.userID,comment_text,date_commented,profile_picture,postID FROM comments 
            JOIN users ON comments.userID=users.userID 
            WHERE postID=${postID} 
            AND NOT EXISTS (
            (SELECT 1
            FROM blocked_users
            WHERE
                (blockerId = ${userID} AND blockedId = users.userID)
                    OR
                (blockerId = users.userID AND blockedId = ${userID})
            )
            ) 
            ORDER BY commentID DESC
            LIMIT ${limit} OFFSET ${offset}
        `).then(res=>{return res[0]})
    }
}
export const GET_POST_LIKES = {
    type: new GraphQLList(LikesType),
    args:{
        postID:{type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset, userID} = args
        return await connection.promise().query(`
            SELECT first_name,last_name,users.userID,profile_picture,username
            FROM likes 
            JOIN users ON likes.userID=users.userID 
            WHERE postID=${postID} 
            AND NOT EXISTS (
            (SELECT 1
            FROM blocked_users
            WHERE
                (blockerId = ${userID} AND blockedId = users.userID)
                    OR
                (blockerId = users.userID AND blockedId = ${userID})
            )
            )
            LIMIT ${limit} OFFSET ${offset}
        `).then(res=>{return res[0]})
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
        return await connection.promise().query(`
            SELECT EXISTS(SELECT 1 FROM likes WHERE userID=${userID} AND postID=${postID} LIMIT 1) AS ifLiked
        `).then(res=>{return res[0][0].ifLiked===1 ? true : false})
    }
}