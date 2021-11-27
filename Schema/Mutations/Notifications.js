import { GraphQLInt, GraphQLString} from "graphql"
import connection from "../../middleware/db.js"
import {NotificationType} from "../TypeDefs/Notifications.js"

export const LIKE_NOTIFICATION = {
    type: NotificationType,
    args: {
        postID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
    },
    resolve(_, args) {
        const {postID, sender_id, receiver_id, type} = args
        const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                        VALUES (null, ${sender_id}, ${receiver_id}, ${postID}, null, "like")`
        connection.query(sql)
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
        const {postID, sender_id, receiver_id, type} = args
        const sql = `INSERT INTO notifications (Nid, sender_id, receiver_id, postID, time_sent, type)
                        VALUES (null, ${sender_id}, ${receiver_id}, ${postID}, null, "comment")`
        connection.query(sql)
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