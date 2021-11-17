import { GraphQLBoolean, GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { FeedPostType } from '../TypeDefs/Posts.js';
import {SavesType} from '../TypeDefs/Saves.js'

let temp=[]

export const IF_SAVED = {
    type: new GraphQLList(SavesType),
    args: {
        userID: {type: GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        const sql = `SELECT * FROM saves WHERE userID=${userID}`
        let result = connection.query(sql)
        return result
    }
}
export const GET_SAVES = {
    type: new GraphQLList(FeedPostType),
    args: {
        userID: {type:GraphQLInt}
    },
    resolve(_, args){
        const {userID} = args
        const sql = `SELECT saves.postID,posts.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture FROM saves JOIN posts ON posts.postID=saves.postID JOIN users ON users.userID=posts.userID WHERE saves.userID=${userID} ORDER BY date_posted DESC;`
        const comm = `SELECT commentID,comments.userID,postID,comment_text,username,profile_picture,date_commented FROM comments JOIN users ON comments.userID=users.userID`
        const like = `SELECT likeID,postID,username,first_name,last_name,profile_picture,users.userID FROM likes JOIN users ON likes.userID=users.userID`
        let r1 = connection.query(sql)
        let r2 = connection.query(comm)
        let r3 =  connection.query(like)
        r1.forEach(r => {
            temp = []
            r2.forEach(c => {
                if(c.postID===r.postID) temp.push(c)
            })
            r.comments = temp
        })
        temp=[]
        r1.forEach(r => {
            temp = []
            r3.forEach(l => {
                if(l.postID===r.postID) temp.push(l)
            })
            r.likes = temp
        })
        return r1
    }
}

