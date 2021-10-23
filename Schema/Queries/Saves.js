import { GraphQLBoolean, GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { FeedPostType } from '../TypeDefs/Posts.js';
import {SavesType} from '../TypeDefs/Saves.js'

let saves = []
let saved = []
let temp=[]

export const IF_SAVED = {
    type: new GraphQLList(SavesType),
    args: {
        userID: {type: GraphQLInt}
    },
    resolve(parent, args){
        const {userID} = args
        const sql = `SELECT * FROM saves WHERE userID=${userID}`
        connection.query(sql, (err, res) => {
            if (err) throw err;
            saves = res
        })
        return saves
    }
}


export const GET_SAVES = {
    type: new GraphQLList(FeedPostType),
    args: {
        userID: {type:GraphQLInt}
    },
    resolve(parent, args){
        const {userID} = args
        let sql = `SELECT saves.postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture FROM saves JOIN posts ON posts.postID=saves.postID JOIN users ON users.userID=posts.userID WHERE saves.userID=${userID}`
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
            saved = resultp
        }) 
        return saved
    }
}

