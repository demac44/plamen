import { GraphQLInt, GraphQLString } from "graphql"
import connection from "../../middleware/db.js"
import {NotificationType} from "../TypeDefs/Notifications.js"

import { pubsub } from "../../server.js"

export const LIKE_NOTIFICATION = {
    type: NotificationType,
    args: {
        postID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
    },
    async resolve(_, args) {
        const {postID, sender_id, receiver_id} = args
        if(sender_id!==receiver_id){
            const user = await connection.promise().query(`SELECT username, profile_picture FROM users WHERE userID=${sender_id}`).then(res=>{return res[0]})
            const result = await connection.promise().query(`
                INSERT INTO notifications (sender_id, receiver_id, postID, type)
                VALUES (${sender_id}, ${receiver_id}, ${postID}, "like")
            `).then(res=>{return res[0]})
            pubsub.publish('NOTIFICATION', {newNotification: {
                sender_id, 
                receiver_id, 
                postID, 
                Nid:result.insertId, 
                type:"like", 
                username: user[0].username,
                profile_picture: user[0].profile_picture,
                time_sent: new Date().getTime()
            }
        })
        return args
    }
}}


export const COMM_NOTIFICATION = {
    type: NotificationType,
    args: {
        postID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
    },
    async resolve(_, args) {
        const {postID, sender_id, receiver_id} = args
        if(sender_id!==receiver_id){
            const user = await connection.promise().query(`SELECT username, profile_picture FROM users WHERE userID=${sender_id}`).then(res=>{return res[0]})
            const result = await connection.promise().query(`
                INSERT INTO notifications (sender_id, receiver_id, postID, type)
                VALUES (${sender_id}, ${receiver_id}, ${postID}, "comment")
            `).then(res=>{return res[0]})
            pubsub.publish('NOTIFICATION', {newNotification: {
                sender_id, 
                receiver_id, 
                postID, 
                Nid:result.insertId, 
                type:"comment", 
                username: user[0].username,
                profile_picture: user[0].profile_picture,
                time_sent: new Date().getTime()
            }})
        }
        return args
    }
}

export const FOLLOW_NOTIFICATION = {
    type: NotificationType,
    args: {
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
    },
    async resolve(_, args) {
        const {sender_id, receiver_id} = args
        if(sender_id!==receiver_id){
            const user = await connection.promise().query(`SELECT username, profile_picture FROM users WHERE userID=${sender_id}`).then(res=>{return res[0]})
            const result = await connection.promise().query(`
                INSERT INTO notifications (sender_id, receiver_id, type)
                VALUES (${sender_id}, ${receiver_id}, "follow")
            `).then(res=>{return res[0]})
            pubsub.publish('NOTIFICATION', {newNotification: {
                sender_id, 
                receiver_id, 
                Nid:result.insertId, 
                type:"follow", 
                username: user[0].username,
                profile_picture: user[0].profile_picture,
                time_sent: new Date().getTime()
            }})
        }
        return args
    }
}

export const MENTION_NOTIFICATION = {
    type: NotificationType,
    args:{
        postID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        username:  {type: GraphQLString},
        profile_picture: {type:GraphQLString},
        receiver_username: {type: GraphQLString}
    },
    async resolve(_, args){
        const {sender_id, postID, username, profile_picture, receiver_username} = args
        const userRes = await connection.promise().query(`SELECT userID FROM users WHERE username="${receiver_username}"`).then(res=>{return res[0][0]})
        if(userRes){
            if(sender_id!==userRes.userID){
                const result = await connection.promise().query(`
                    INSERT INTO notifications (sender_id, receiver_id, postID, type)
                    VALUES (${sender_id}, ${userRes.userID}, ${postID}, "mention")
                `).then(res=>{return res[0]})
                pubsub.publish('NOTIFICATION', {newNotification: {
                    sender_id, 
                    receiver_id: userRes.userID, 
                    Nid:result.insertId, 
                    type:"mention", 
                    username: username,
                    profile_picture: profile_picture,
                    time_sent: new Date().getTime()
                }})
            }
        }
    }
}

export const CMT_MENTION_NOTIFICATION = {
    type: NotificationType,
    args:{
        postID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        username:  {type: GraphQLString},
        profile_picture: {type:GraphQLString},
        receiver_username: {type: GraphQLString}
    },
    async resolve(_, args){
        const {sender_id, postID, username, profile_picture, receiver_username} = args
        const userRes = await connection.promise().query(`SELECT userID FROM users WHERE username="${receiver_username}"`).then(res=>{return res[0][0]})
        if(userRes){
            if(sender_id!==userRes.userID){
                const result = await connection.promise().query(`
                    INSERT INTO notifications (sender_id, receiver_id, postID, type)
                    VALUES (${sender_id}, ${userRes.userID}, ${postID}, "mention-cmt")
                `).then(res=>{return res[0]})
                pubsub.publish('NOTIFICATION', {newNotification: {
                    sender_id, 
                    receiver_id: userRes.userID, 
                    Nid:result.insertId, 
                    type:"mention-cmt", 
                    username: username,
                    profile_picture: profile_picture,
                    time_sent: new Date().getTime()
                }})
            }
        }
    }
}

export const CLEAR_NOTIFICATIONS = {
    type: NotificationType,
    args:{
        receiver_id:{type:GraphQLInt}
    },
    resolve(_, args){
        const {receiver_id} = args
        connection.query(`DELETE FROM notifications WHERE receiver_id=${receiver_id}`)
        return args
    }
}

export const REMOVE_LIKE_NOTIF = {
    type: NotificationType,
    args:{
        sender_id:{type:GraphQLInt},
        postID:{type:GraphQLInt}
    },
    resolve(_, args) {
        const {sender_id, postID} = args
        connection.query(`DELETE FROM notifications WHERE sender_id=${sender_id} AND postID=${postID} AND type="like"`)
        return args
    }
}
export const REMOVE_COMMENT_NOTIF = {
    type: NotificationType,
    args:{
        sender_id:{type:GraphQLInt},
        postID:{type:GraphQLInt}
    },
    resolve(_, args) {
        const {sender_id, postID} = args
        connection.query(`DELETE FROM notifications WHERE sender_id=${sender_id} AND postID=${postID} AND type="comment"`)
        return args
    }
}
export const REMOVE_FOLLOW_NOTIF = {
    type: NotificationType,
    args:{
        sender_id:{type:GraphQLInt},
        receiver_id:{type:GraphQLInt}
    },
    resolve(_, args) {
        const {sender_id, receiver_id} = args
        connection.query(`DELETE FROM notifications WHERE sender_id=${sender_id} AND receiver_id=${receiver_id} AND type="follow"`)
        return args
    }
}