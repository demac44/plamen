import { GraphQLBoolean, GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import { CommentType } from '../TypeDefs/Comments.js';
import { GroupPostType, GroupType, GroupUserType, CommunityChatMessagesType } from "../TypeDefs/Groups.js"
import { LikesType } from '../TypeDefs/Likes.js';
import { GroupReportedPost } from '../TypeDefs/Report.js';

import CryptoJS from 'crypto-js';

export const GET_ALL_GROUPS = {
    type: new GraphQLList(GroupType),
    args:{
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {limit, offset} = args
        const sql = `SELECT communities.groupID, group_name, banner_image
                     FROM communities
                     JOIN community_info ON community_info.groupID=communities.groupID
                     LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
    }   
}


export const GET_GROUPS = {
    type: new GraphQLList(GroupType),
    args:{
        userID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT group_name, community_members.groupID 
                     FROM community_members 
                     JOIN communities ON community_members.groupID=communities.groupID 
                     WHERE community_members.userID=${userID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result
    }    
}      

export const GET_GROUP = {
    type: GroupType,
    args:{
        groupID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {groupID} = args
        const sql = `SELECT * FROM communities 
                     JOIN community_info ON communities.groupID=community_info.groupID
                     WHERE communities.groupID=${groupID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }
}

export const GET_GROUP_POSTS = {
    type: new GraphQLList(GroupPostType),
    args: {
        groupID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    async resolve(_, args){
        const {groupID, limit, offset, userID} = args
        const sql = `SELECT postID,community_posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,groupID
                     FROM community_posts
                     JOIN users ON community_posts.userID=users.userID 
                     WHERE users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                     AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
                     AND users.disabled=false
                     AND community_posts.groupID=${groupID}
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
        const sql = `SELECT community_posts_saved.postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,community_posts.userID
                        FROM community_posts_saved
                        JOIN community_posts ON community_posts.postID=community_posts_saved.postID 
                        JOIN users ON users.userID=community_posts_saved.userID 
                        WHERE users.disabled=false 
                        AND users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                        AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
                        AND community_posts_saved.userID=${userID} 
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
        const sql = `SELECT EXISTS(SELECT 1 FROM community_posts_saved WHERE userID=${userID} AND postID=${postID} LIMIT 1) AS ifSaved`
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
        offset: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset, userID} = args
        const sql = `SELECT commentID,username,community_posts_comments.userID,comment_text,date_commented,profile_picture,postID 
                     FROM community_posts_comments 
                     JOIN users ON community_posts_comments.userID=users.userID 
                     WHERE users.disabled=false 
                     AND users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                     AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
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
        offset: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {postID, limit, offset, userID} = args
        const sql = `SELECT first_name,last_name,users.userID,username,profile_picture FROM community_posts_likes 
                     JOIN users ON community_posts_likes.userID=users.userID 
                     WHERE users.disabled=false 
                     AND users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                     AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
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
        const sql = `SELECT EXISTS(SELECT 1 FROM community_posts_likes WHERE userID=${userID} AND postID=${postID} LIMIT 1) AS ifLiked`
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
                        FROM community_members
                        JOIN community_roles ON community_members.roleID=community_roles.roleID
                        WHERE community_members.userID=${userID} 
                        AND community_members.groupID=${groupID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        return result[0]
    }
}

export const GET_GROUP_MEMBERS = {
    type: new GraphQLList(GroupUserType),
    args:{
        groupID:{type: GraphQLInt},
    },
    async resolve(_, args){
        const {groupID} = args
        const sql = `SELECT username,first_name,last_name,community_members.userID, profile_picture, date_joined, role, groupID
                     FROM community_members
                     JOIN users ON community_members.userID=users.userID
                     JOIN community_roles ON community_roles.roleID=community_members.roleID
                     WHERE users.disabled=false
                     AND community_members.groupID=${groupID}`
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
        const sql = `SELECT * FROM community_join_requests WHERE userID=${userID} AND groupID=${groupID}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result[0]
    }
}

export const GET_GROUP_REPORTED_POSTS = {
    type: new GraphQLList(GroupReportedPost),
    args: {
        groupID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupID} = args
        const sql = `SELECT first_name,last_name,username,users.userID,profile_picture,community_posts.postID,
                            reasons,post_text,url,reportID,community_posts.groupID,date_posted,date_reported,type
                     FROM community_posts_reports
                     JOIN community_posts ON community_posts.postID=community_posts_reports.postID
                     JOIN users ON community_posts.userID=users.userID
                     WHERE community_posts_reports.groupID=${groupID}
                     ORDER BY date_reported DESC`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}

export const GET_GROUP_JOIN_REQUESTS = {
    type: new GraphQLList(GroupUserType),
    args:{
        groupID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupID} = args
        const sql = `SELECT users.userID, first_name,last_name,username,profile_picture,groupID 
                     FROM community_join_requests 
                     JOIN users ON community_join_requests.userID=users.userID
                     WHERE groupID=${groupID}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        return result
    }
}

export const GET_COMMUNITY_MESSAGES = {
    type: new GraphQLList(CommunityChatMessagesType),
    args:{
        groupID:{type: GraphQLInt},
        limit:{type: GraphQLInt},
        offset:{type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    async resolve(_,args){
        const {groupID, limit, offset, userID} = args
        const sql = `SELECT msgID, msg_text, time_sent, groupID, username, type, url, users.userID, profile_picture
                     FROM community_chat_messages
                     JOIN users ON community_chat_messages.userID=users.userID
                     WHERE 
                     users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                     AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
                     AND groupID=${groupID}
                     ORDER BY time_sent DESC
                     LIMIT ${limit} OFFSET ${offset}`
        const result = await connection.promise().query(sql).then(res=>{return res[0]})
        await result.map(msg => {
            const decrypted = CryptoJS.AES.decrypt(msg?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            Object.assign(msg, {msg_text: decrypted})
        })
        return result
    }
}

export const GET_COMMUNITY_SAVED_POSTS = {
    type: new GraphQLList(GroupPostType),
    args: {
        userID: {type: GraphQLInt},
        groupID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID, groupID, limit, offset} = args
        const sql = `SELECT community_posts.postID,community_posts_saved.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture,type,community_posts.groupID
                        FROM community_posts_saved
                        JOIN community_posts ON community_posts_saved.postID=community_posts.postID
                        JOIN users ON community_posts.userID=users.userID
                        WHERE users.userID NOT IN (SELECT blockedId FROM blocked_users WHERE blockerId=${userID} AND blockedId=users.userID)
                        AND users.userID NOT IN (SELECT blockerId FROM blocked_users WHERE blockedId=${userID} AND blockerId=users.userID)
                        AND users.disabled=false
                        AND community_posts_saved.groupID=${groupID}
                        AND community_posts_saved.userID=${userID}
                        ORDER BY date_posted DESC LIMIT ${limit} OFFSET ${offset};`
        return await connection.promise().query(sql).then(res=>{return res[0]})
    }
}