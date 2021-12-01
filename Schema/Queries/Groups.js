import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { GroupPostType, GroupType } from "../TypeDefs/Groups.js"

export const GET_GROUPS = {
    type: new GraphQLList(GroupType),
    args:{
        userID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        const sql = `SELECT group_name, group_users.groupID FROM group_users JOIN groups ON group_users.groupID=groups.groupID WHERE group_users.userID=${userID}`
        const result = connection.query(sql)
        return result
    }    
}    

export const GET_GROUP = {
    type: GroupType,
    args:{
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {groupID} = args
        const sql = `SELECT * FROM groups 
                     JOIN group_info ON groups.groupID=group_info.groupID
                     WHERE groups.groupID=${groupID}`
        const posts_sql = `SELECT * FROM group_posts WHERE groupID=${groupID} ORDER BY date_posted DESC`
        const users_sql = `SELECT * FROM group_users
                            JOIN group_roles ON group_users.roleID=group_roles.roleID
                            WHERE groupID=${groupID}`
        const result = connection.query(sql)
        // const posts = connection.query(posts_sql)
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
    resolve(_, args) {
        const {groupID, limit, offset} = args
        const sql = `SELECT postID,group_posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture FROM group_posts
                        JOIN users ON group_posts.userID=users.userID
                        WHERE group_posts.groupID=${groupID}
                        ORDER BY date_posted DESC LIMIT ${limit} OFFSET ${offset};`
        const comm = `SELECT commentID,group_posts_comments.userID,postID,comment_text,username,profile_picture,date_commented 
                        FROM group_posts_comments 
                        JOIN users ON group_posts_comments.userID=users.userID`
        const like = `SELECT postID,username,first_name,last_name,profile_picture,users.userID 
                        FROM group_posts_likes JOIN users ON group_posts_likes.userID=users.userID`
        let r1 = connection.query(sql)
        let r2 = connection.query(comm)
        let r3 =  connection.query(like)
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