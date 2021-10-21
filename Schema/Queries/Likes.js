import { GraphQLBoolean, GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import {LikesType} from '../TypeDefs/Likes.js'


let likes = [];
let users = [];


export const IF_LIKED = {
    type: new GraphQLList(LikesType),
    args: {
        userID: {type: GraphQLInt}
    },
    resolve(parent, args){
        const {userID} = args
        const sql = `SELECT * FROM postLikes WHERE userID=${userID}`
        connection.query(sql, (err, res) => {
            if (err) throw err;
            likes = res
        })
        return likes
    }
}


export const GET_LIKES = {
    type: new GraphQLList(LikesType),
    args: {
        postID: {type:GraphQLInt}
    },
    resolve(parent, args){
        const {postID} = args
        let sql = `SELECT likeID,postID,username,first_name,last_name,profile_picture,users.userID FROM postLikes JOIN users ON postLikes.userID=users.userID WHERE postID IN (SELECT postID FROM posts WHERE postID=${postID})`
        connection.query(sql, (err, result)=>{
            if (err) throw err;
            result = JSON.parse(JSON.stringify(result))
            users = result
        })
        return users
    }
}

