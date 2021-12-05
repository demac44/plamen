import { GraphQLInt, GraphQLList } from 'graphql';
import connection from '../../middleware/db.js'
import { GroupPostType, GroupType, GroupUserType } from "../TypeDefs/Groups.js"

export const GET_GROUPS = {
    type: new GraphQLList(GroupType),
    args:{
        userID:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        const sql = `SELECT group_name, group_users.groupID FROM group_users JOIN groups ON group_users.groupID=groups.groupID WHERE group_users.userID=${userID}`
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
        const users_sql = `SELECT * FROM group_users
                            JOIN group_roles ON group_users.roleID=group_roles.roleID
                            WHERE groupID=${groupID}`
        const result = await connection.promise().query(sql).then((res)=>{return res[0]})
        // const users = connection.query(users_sql)
        // result.posts = posts
        // result.users = users 
        return result[0]
    }
}

let temp = []

export const GET_GROUP_POSTS = {
    type: new GraphQLList(GroupPostType),
    args: {
        groupID: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    },    
    async resolve(_, args) {
        const {groupID, limit, offset} = args
        const sql = `SELECT postID,group_posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture, type FROM group_posts
                        JOIN users ON group_posts.userID=users.userID
                        WHERE group_posts.groupID=${groupID}
                        ORDER BY date_posted DESC LIMIT ${limit} OFFSET ${offset};`
        const comm = `SELECT commentID,group_posts_comments.userID,postID,comment_text,username,profile_picture,date_commented 
                        FROM group_posts_comments 
                        JOIN users ON group_posts_comments.userID=users.userID`
        const like = `SELECT postID,username,first_name,last_name,profile_picture,users.userID 
                        FROM group_posts_likes JOIN users ON group_posts_likes.userID=users.userID`
        let r1 = await connection.promise().query(sql).then((res)=>{return res[0]})
        let r2= await connection.promise().query(comm).then((res)=>{return res[0]})
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
                     WHERE group_users.groupID=${groupID}`
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

