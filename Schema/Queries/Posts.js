import { GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import {PostType} from '../TypeDefs/Posts.js'
import {FeedPostType} from '../TypeDefs/Posts.js'

let count;

let posts = []
  
export const GET_POSTS = {
    type: new GraphQLList(FeedPostType),
    args: {
        userID: {type: GraphQLInt},
    },    
    resolve(parent, args) {
        const {userID} = args
        connection.query(`SELECT * FROM posts WHERE userID=${userID} ORDER BY date_posted DESC`, (err, resultp)=>{
            resultp.forEach(r => {
                const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID WHERE postID=${r.postID}`
                connection.query(comm, (err, resultc)=>{
                    if(err)throw err
                    r.comments = resultc
                })
            })
            posts = resultp
        }) 
        return posts
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
        connection.query(sql, (err, resultp)=>{
            if(err) throw err
            resultp.forEach(r => {
                const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID WHERE postID=${r.postID}`
                connection.query(comm, (err, resultc)=>{
                    if(err)throw err
                    r.comments = resultc
                })
            })
            posts = resultp
        }) 
        return posts
    }  
}

