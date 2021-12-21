import { GraphQLInt, GraphQLString, GraphQLBoolean} from "graphql"
import connection from "../../middleware/db.js"
import { CommentType } from "../TypeDefs/Comments.js"
import { GroupPostType, GroupType, GroupUserType } from "../TypeDefs/Groups.js"
import { LikesType } from "../TypeDefs/Likes.js"
import { PostType } from "../TypeDefs/Posts.js"


export const CREATE_GROUP = {
    type: GroupType,
    args: {
        group_name: {type: GraphQLString},
        group_creator_id: {type: GraphQLInt},
        closed: {type:GraphQLBoolean},
        group_description: {type:GraphQLString},
        group_tags: {type:GraphQLString}
    },
    async resolve(_, args) {
        const {group_name, group_creator_id, closed, group_description, group_tags} = args
        const sql = `INSERT INTO communities (groupID, group_name, group_creator_id, date_created, closed) 
                    VALUES (null, "${group_name}", ${group_creator_id}, null, ${closed})`
        const res = await connection.promise().query(sql).then(res=>{return res[0]})
        const sql2 = `INSERT INTO community_info (groupID, group_description, group_tags)
                        VALUES (${res.insertId}, "${group_description}", "${group_tags}")`
        const sql3 = `INSERT INTO community_users (groupID, userID, roleID, date_joined)
                        VALUES (${res.insertId}, ${group_creator_id}, 1, null)`
        connection.query(sql2)
        connection.query(sql3)
        return args
    }
}

export const CREATE_GROUP_POST = {
    type: GroupPostType,
    args: {
        userID: {type: GraphQLInt},
        groupID:{type:GraphQLInt},
        post_text: {type: GraphQLString},
        url: {type: GraphQLString},
        type:{type:GraphQLString}
    },
    resolve (_, args){
        const {userID, post_text, url, groupID, type} = args
        const sql = `INSERT INTO community_posts (postID, groupID, userID, post_text, date_posted, url, type)
                    VALUES (null, ${groupID}, ${userID}, "${post_text}", null, "${url}", "${type}")`
        connection.query(sql)
        return args
    }
}
export const DELETE_GROUP_POST = {
    type: GroupPostType,
    args: {
        postID:{type: GraphQLInt}
    },
    resolve(_, args){
        const {postID} = args
        const sql = `DELETE FROM community_posts WHERE postID=${postID}`
        connection.query(sql)
        return args
    } 
}

export const ADD_GP_COMMENT = {
    type: CommentType,
    args: {
        postID:{type:GraphQLInt},
        userID: {type: GraphQLInt},
        comment_text: {type: GraphQLString},
    },
    resolve(_, args) {
        const {userID, postID, comment_text} = args
        const sql = `INSERT INTO community_posts_comments (commentID ,postID, userID, comment_text, date_commented)
                    VALUES (null, ${postID} ,${userID}, "${comment_text}", null)`
        connection.query(sql)
        return args
    }
}


export const REMOVE_GP_COMMENT = {
    type: CommentType,
    args: {
        commentID:{type: GraphQLInt}
    },
    resolve(_, args){
        const {commentID} = args
        const sql = `DELETE FROM community_posts_comments WHERE commentID=${commentID}`
        connection.query(sql)
        return args
    } 
}

export const LIKE_GP_POST = {
    type: LikesType,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt}
    },
    resolve(_, args) {
        const {postID, userID} = args
        const sql = `INSERT INTO community_posts_likes (userID, postID) 
                    VALUES (${userID}, ${postID})`
        connection.query(sql)
        return args
    }
}

export const REMOVE_GP_LIKE = {
    type: LikesType,
    args: {
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    resolve(_, args){
        const {postID, userID} = args
        const sql = `DELETE FROM community_posts_likes WHERE postID=${postID} AND userID=${userID}`
        connection.query(sql)
        return args
    }
}

export const SAVE_GP = {
    type: PostType,
    args: {
        userID: {type: GraphQLInt},
        postID: {type: GraphQLInt},
        groupID:{type: GraphQLInt}
    },
    resolve(_, args) {
        const {postID, userID, groupID} = args
        const sql = `INSERT INTO community_posts_saved (userID, postID, groupID) 
                    VALUES (${userID}, ${postID}, ${groupID})`
        connection.query(sql)
        return args
    }
}

export const REMOVE_SAVED_GP = {
    type: PostType,
    args: {
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    }, 
    resolve(_, args){
        const {postID, userID} = args
        const sql = `DELETE FROM community_posts_saved WHERE postID=${postID} AND userID=${userID}`
        connection.query(sql)
        return args
    }
}

export const JOIN_GROUP = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID, groupID} = args
        const sql = `INSERT INTO community_members (groupID, userID, roleID, date_joined)
                    VALUES (${groupID}, ${userID}, 4, null)`
        connection.query(sql)
        return args
    }
}

export const LEAVE_GROUP = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID, groupID} = args
        const sql = `DELETE FROM community_members WHERE userID=${userID} AND groupID=${groupID}`
        connection.query(sql)
        return args
    }
}

export const JOIN_REQUEST = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID, groupID} = args
        const sql = `INSERT INTO community_join_requests (userID, groupID)
                     VALUES (${userID}, ${groupID})`
        connection.query(sql)
        return args
    }
}

export const REMOVE_REQUEST = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID, groupID} = args
        const sql = `DELETE FROM community_join_requests WHERE userID=${userID} AND groupID=${groupID}`
        connection.query(sql)
        return args
    }
}

export const ACCEPT_REQUEST = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID, groupID} = args
        const sql = `DELETE FROM group_join_requests WHERE userID=${userID} AND groupID=${groupID}`
        const sql2 = `INSERT INTO community_members (groupID, userID, roleID, date_joined)
                        VALUES (${groupID}, ${userID}, 4, null)`
        connection.query(sql)
        connection.query(sql2)
        return args
    }
}

export const DENY_REQUEST = {
    type: GroupUserType,
    args:{
        userID:{type:GraphQLInt},
        groupID:{type:GraphQLInt}
    },
    resolve(_, args){
        const {userID, groupID} = args
        const sql = `DELETE FROM community_join_requests WHERE userID=${userID} AND groupID=${groupID}`
        connection.query(sql)
        return args
    }
}