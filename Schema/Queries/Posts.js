import { GraphQLInt, GraphQLList, GraphQLString} from 'graphql';
import connection from '../../middleware/db.js'
import {PostType} from '../TypeDefs/Posts.js'

let posts = []
let count;

  
export const GET_POSTS = {
    type: new GraphQLList(PostType),
    args: {
        userID: {type: GraphQLInt},
    },    
    resolve(parent, args) {
        const {userID} = args
        connection.query(`SELECT * FROM posts WHERE userID=${userID} ORDER BY date_posted DESC`, (err, results)=>{
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
        connection.query(`SELECT COUNT(postID) as postcount FROM posts WHERE userID=${userID}`, (err, result)=>{
            if(err) throw err
            count = result[0].postcount
        }) 
        return count
    }   
}

export const GET_FEED_POSTS = {
    type: new GraphQLList(PostType),
    args: {
        userID: {type: GraphQLInt},
    },    
    resolve(parent, args) {
        const {userID} = args
        connection.query(`SELECT * FROM posts WHERE userID`, (err, results)=>{
            if(err) throw err
            results = JSON.parse(JSON.stringify(results))
            posts = results
        }) 
        return posts
    }  
}