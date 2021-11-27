import { GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { NotificationType } from '../TypeDefs/Notifications.js';


export const GET_NOTIFICATIONS = {
    type: new GraphQLList(NotificationType),
    args:{
        receiver_id: {type:GraphQLInt}
    },
    resolve(_, args){
        const {receiver_id} = args
        const sql = `SELECT username, profile_picture, time_sent, postID, type, Nid, sender_id
                    FROM notifications 
                    JOIN users ON sender_id=users.userID 
                    WHERE receiver_id=${receiver_id}
                    AND DATE(time_sent) > (NOW() - INTERVAL 2 DAY)
                    ORDER BY time_sent DESC`
        const result = connection.query(sql)
        return result
    }
}  