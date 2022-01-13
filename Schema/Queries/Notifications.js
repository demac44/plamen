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
                    WHERE disabled=false 
                    AND receiver_id=${receiver_id}
                    ORDER BY Nid DESC`
        return connection.promise().query(sql).then((res)=>{return res[0]})
    }
}  