import { GraphQLInt } from "graphql"
import connection from "../../middleware/db.js"
import {NotificationType} from "../TypeDefs/Notifications.js"

import { pubsub } from "../schema.js"

export const LIKE_NOTIFICATION = {
    type: NotificationType,
    args: {
        postID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
    },
    resolve(_, args) {
        const {postID, sender_id, receiver_id} = args
        const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                        VALUES (null, ${sender_id}, ${receiver_id}, ${postID}, null, "like")`
        const usr = `SELECT username, profile_picture FROM users WHERE userID=${sender_id}`
        const user = connection.query(usr)
        const result = connection.query(sql)
        pubsub.publish('NOTIFICATION', {newNotification: {
            sender_id, 
            receiver_id, 
            postID, 
            Nid:result.insertId, 
            type:"like", 
            username: user[0].username,
            profile_picture: user[0].profile_picture,
            time_sent: new Date().toUTCString()
        }})
        return args
    }
}

export const COMM_NOTIFICATION = {
    type: NotificationType,
    args: {
        postID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
    },
    resolve(_, args) {
        const {postID, sender_id, receiver_id} = args
        const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                        VALUES (null, ${sender_id}, ${receiver_id}, ${postID}, null, "comment")`   
        const usr = `SELECT username, profile_picture FROM users WHERE userID=${sender_id}`
        const user = connection.query(usr)
        const result = connection.query(sql)
        pubsub.publish('NOTIFICATION', {newNotification: {
            sender_id, 
            receiver_id, 
            postID, 
            Nid:result.insertId, 
            type:"comment", 
            username: user[0].username,
            profile_picture: user[0].profile_picture,
            time_sent: new Date().toUTCString()
        }})
        return args
    }
}

export const FOLLOW_NOTIFICATION = {
    type: NotificationType,
    args: {
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
    },
    resolve(_, args) {
        const {sender_id, receiver_id} = args
        const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                        VALUES (null, ${sender_id}, ${receiver_id}, null, null, "follow")`
        const usr = `SELECT username, profile_picture FROM users WHERE userID=${sender_id}`
        const user = connection.query(usr)
        const result = connection.query(sql)
        pubsub.publish('NOTIFICATION', {newNotification: {
            sender_id, 
            receiver_id, 
            Nid:result.insertId, 
            type:"follow", 
            username: user[0].username,
            profile_picture: user[0].profile_picture,
            time_sent: new Date().toUTCString()
        }})
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