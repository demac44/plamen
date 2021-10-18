import { GraphQLBoolean, GraphQLInt} from 'graphql';
import connection from '../../middleware/db.js'

let count;
   

export const IF_FOLLOWING = {
    type: GraphQLBoolean,
    args: {
        followerID: {type: GraphQLInt},
        followedID: {type:GraphQLInt}
    },    
    resolve(parent, args) {
        const {followerID, followedID} = args
        connection.query(`SELECT COUNT(*) as ifFollowing FROM followings WHERE followerID=${followerID} AND followedID=${followedID}`, (err, result)=>{
            if(err) throw err
            count = result[0].ifFollowing
        }) 
        return count 
    }   
}
 