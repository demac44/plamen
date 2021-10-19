import { GraphQLInt, GraphQLList, GraphQLString} from 'graphql';
import connection from '../../middleware/db.js'
import {PostType} from '../TypeDefs/Posts.js'
import {FeedPostType} from '../TypeDefs/Posts.js'


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
    type: new GraphQLList(FeedPostType),
    args: {
        userID: {type: GraphQLInt},
    },    
    resolve(parent, args) {
        const {userID} = args
        const sql = `SELECT postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture FROM posts JOIN users ON posts.userID=users.userID WHERE users.userID IN (SELECT followedID FROM followings WHERE followerID=${userID}) AND DATE(date_posted) > (NOW() - INTERVAL 5 DAY) ORDER BY date_posted DESC;`
        connection.query(sql, (err, results)=>{
            if(err) throw err
            results = JSON.parse(JSON.stringify(results))
            posts = results
        }) 
        return posts
    }  
}

