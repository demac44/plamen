import { GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import {FeedPostType} from '../TypeDefs/Posts.js'


let temp = []
let posts = []
  
export const GET_POSTS = {
    type: new GraphQLList(FeedPostType),
    args: {
        userID: {type: GraphQLInt},
    },    
    resolve(parent, args) {
        const {userID} = args
        const sql = `SELECT * FROM posts WHERE userID=${userID} ORDER BY date_posted DESC`
        const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID`
        const like = `SELECT likeID,postID,username,first_name,last_name,profile_picture,users.userID FROM postLikes JOIN users ON postLikes.userID=users.userID`
        connection.query(sql, (err, resultp)=>{
            if(err) throw err
            connection.query(comm, (err, resultc)=>{
                if(err)throw err
                resultp.forEach(r => {
                    temp = []
                    resultc.forEach(c => {
                        if(c.postID===r.postID) temp.push(c)
                    })
                    r.comments = temp
                })
            })
            connection.query(like, (err, resultl)=>{
                if(err) throw err
                resultp.forEach(r => {
                    temp = []
                    resultl.forEach(l => {
                        if(l.postID===r.postID) temp.push(l)
                    })
                    r.likes = temp
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
        const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID`
        const like = `SELECT likeID,postID,username,first_name,last_name,profile_picture,users.userID FROM postLikes JOIN users ON postLikes.userID=users.userID`
        connection.query(sql, (err, resultp)=>{
            if(err) throw err
            connection.query(comm, (err, resultc)=>{
                if(err)throw err
                resultp.forEach(r => {
                    temp = []
                    resultc.forEach(c => {
                        if(c.postID===r.postID) temp.push(c)
                    })
                    r.comments = temp
                })
            })
            connection.query(like, (err, resultl)=>{
                if(err) throw err
                resultp.forEach(r => {
                    temp = []
                    resultl.forEach(l => {
                        if(l.postID===r.postID) temp.push(l)
                    })
                    r.likes = temp
                })
            })
            posts = resultp
        }) 
        return posts
    }  
}

