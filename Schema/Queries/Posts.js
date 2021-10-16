import { GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import {TextPostType} from '../TypeDefs/Posts.js'

let posts = []
let count;

  
export const GET_POSTS = {
    type: new GraphQLList(TextPostType),
    args: {
        userID: {type: GraphQLInt}
    },    
    resolve(parent, args) {
        const {userID} = args
        connection.query(`SELECT * FROM textposts WHERE userID=${userID} ORDER BY date_published DESC`, (err, results)=>{
            if(err) throw err
            results = JSON.parse(JSON.stringify(results))
            posts = results
        }) 
        return posts
    }    
}    

export const COUNT_POSTS = {
    type: GraphQLInt,
    args: {
        userID: {type: GraphQLInt}
    },    
    resolve(parent, args) {
        const {userID} = args
        connection.query(`SELECT COUNT(tpostID) as postcount FROM textposts WHERE userID=${userID}`, (err, result)=>{
            if(err) throw err
            count = result[0].postcount
        }) 
        return count
    }   
}
