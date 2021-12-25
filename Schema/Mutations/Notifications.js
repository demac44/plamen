import { GraphQLInt } from "graphql"
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
            const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                            VALUES (null, ${sender_id}, ${receiver_id}, ${postID}, null, "like")`
            const usr = `SELECT username, profile_picture FROM users WHERE userID=${sender_id}`
            const user = await connection.promise().query(usr).then(res=>{return res[0]})
            const result = await connection.promise().query(sql).then(res=>{return res[0]})
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
            const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                            VALUES (null, ${sender_id}, ${receiver_id}, ${postID}, null, "comment")`   
            const usr = `SELECT username, profile_picture FROM users WHERE userID=${sender_id}`
            const user = await connection.promise().query(usr).then(res=>{return res[0]})
            const result = await connection.promise().query(sql).then(res=>{return res[0]})
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
            const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                            VALUES (null, ${sender_id}, ${receiver_id}, null, null, "follow")`
            const usr = `SELECT username, profile_picture FROM users WHERE userID=${sender_id}`
            const user = await connection.promise().query(usr).then(res=>{return res[0]})
            const result = await connection.promise().query(sql).then(res=>{return res[0]})
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

export const CLEAR_NOTIFICATIONS = {
    type: NotificationType,
    args:{
        receiver_id:{type:GraphQLInt}
    },
    resolve(_, args){
        const {receiver_id} = args
        const sql = `DELETE FROM notifications WHERE receiver_id=${receiver_id}`
        connection.query(sql)
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
        const sql = `DELETE FROM notifications WHERE sender_id=${sender_id} AND postID=${postID} AND type="like"`
        connection.query(sql)
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
        const sql = `DELETE FROM notifications WHERE sender_id=${sender_id} AND postID=${postID} AND type="comment"`
        connection.query(sql)
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
        const sql = `DELETE FROM notifications WHERE sender_id=${sender_id} AND receiver_id=${receiver_id} AND type="follow"`
        connection.query(sql)
        return args
    }
}