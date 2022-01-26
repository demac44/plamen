import { GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { NotificationType } from '../TypeDefs/Notifications.js';


export const GET_NOTIFICATIONS = {
    type: new GraphQLList(NotificationType),
    args:{
        receiver_id: {type:GraphQLInt}
    },
    async resolve(_, args){
        const {receiver_id} = args
        return await connection.promise().query(`
            SELECT username, profile_picture, time_sent, postID, type, Nid, sender_id
            FROM notifications 
            JOIN users ON sender_id=users.userID 
            WHERE disabled=false 
            AND receiver_id=${receiver_id}
            ORDER BY Nid DESC
        `).then((res)=>{return res[0]})
    }
}  