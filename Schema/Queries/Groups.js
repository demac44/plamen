import { GraphQLBoolean, GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import { CommentType } from '../TypeDefs/Comments.js';
import { GroupPostType, GroupType, GroupUserType } from "../TypeDefs/Groups.js"
import { LikesType } from '../TypeDefs/Likes.js';

export const GET_GROUPS = {
    type: new GraphQLList(GroupType),
    args:{
        userID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT group_name, group_users.groupID 
                     FROM group_users 
                     JOIN groups ON group_users.groupID=groups.groupID 
                     WHERE group_users.userID=${userID}`
        const result = await connection.promise().query(sql).then((res)=>{
            return res
        })
        return result[0]
    }    
}      

export const GET_GROUP = {
    type: GroupType,
    args:{
        groupID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {groupID} = args
        const sql = `SELECT * FROM groups 
                     JOIN group_info ON groups.groupID=group_info.groupID
                     WHERE groups.groupID=${groupID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }
}

export const GET_GROUP_POSTS = {
    type: new GraphQLList(GroupPostType),
    args: {
        groupID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    }, 
    async resolve(_, args){
        const {groupID, limit, offset} = args
        const sql = `SELECT postID,group_posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,groupID
                     FROM group_posts
                     JOIN users ON group_posts.userID=users.userID 
                     WHERE users.disabled=false 
                     AND group_posts.groupID=${groupID}
                     ORDER BY date_posted DESC LIMIT ${limit} OFFSET ${offset};`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}

// saved posts
export const GET_SAVED_GROUP_POSTS = {
    type: new GraphQLList(GroupPostType),
    args: {
        userID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    }, 
    async resolve(_, args){
        const {userID,limit,offset} = args
        const sql = `SELECT group_posts_saved.postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,group_posts.userID
                        FROM group_posts_saved
                        JOIN group_posts ON group_posts.postID=group_posts_saved.postID 
                        JOIN users ON users.userID=posts.userID 
                        WHERE users.disabled=false 
                        AND saves.userID=${userID} 
                        ORDER BY date_posted DESC 
                        LIMIT ${limit} OFFSET ${offset};`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}
export const IF_GROUP_POST_SAVED = {
    type: GraphQLBoolean,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID, postID} = args
        const sql = `SELECT EXISTS(SELECT 1 FROM group_posts_saved WHERE userID=${userID} AND postID=${postID} LIMIT 1) AS ifSaved`
        const result = await connection.promise().query(sql).then((res)=>{return res[0][0]})
        if(result.ifSaved===1) return true
        return false
    }
}

// comments and likes
export const GET_GROUP_POST_COMMENTS = {
    type: new GraphQLList(CommentType),
    args:{
        postID:{type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset} = args
        const sql = `SELECT commentID,username,group_posts_comments.userID,comment_text,date_commented,profile_picture,postID 
                     FROM group_posts_comments 
                     JOIN users ON group_posts_comments.userID=users.userID 
                     WHERE users.disabled=false 
                     AND postID=${postID} 
                     ORDER BY date_commented DESC 
                     LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}
export const GET_GROUP_POST_LIKES = {
    type: new GraphQLList(LikesType),
    args:{
        postID:{type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset} = args
        const sql = `SELECT first_name,last_name,users.userID,username,profile_picture FROM group_posts_likes 
                     JOIN users ON group_posts_likes.userID=users.userID 
                     WHERE users.disabled=false 
                     AND postID=${postID} 
                     LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}

export const IF_GROUP_POST_LIKED = {
    type: GraphQLBoolean,
    args:{
        postID:{type:GraphQLInt},
        userID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {postID, userID} = args
        const sql = `SELECT EXISTS(SELECT 1 FROM group_posts_likes WHERE userID=${userID} AND postID=${postID} LIMIT 1) AS ifLiked`
        const result = await connection.promise().query(sql).then(res=>{return res[0][0]})
        if(result.ifLiked===1) return true
        return false
    }
}

export const GET_GROUP_USER = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID, groupID} = args
        const sql = `SELECT userID, role, permissions
                        FROM group_users
                        JOIN group_roles ON group_users.roleID=group_roles.roleID
                        WHERE group_users.userID=${userID} 
                        AND group_users.groupID=${groupID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }
}

export const GET_GROUP_MEMBERS = {
    type: new GraphQLList(GroupUserType),
    args:{
        groupID:{type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupID} = args
        const sql = `SELECT username,first_name,last_name,group_users.userID, profile_picture, date_joined, role
                     FROM group_users
                     JOIN users ON group_users.userID=users.userID
                     JOIN group_roles ON group_roles.roleID=group_users.roleID
                     WHERE users.disabled=false 
                     AND group_users.groupID=${groupID}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}

export const IF_REQUESTED = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID, groupID} = args
        const sql = `SELECT * FROM group_join_requests WHERE userID=${userID} AND groupID=${groupID}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result[0]
    }
}

