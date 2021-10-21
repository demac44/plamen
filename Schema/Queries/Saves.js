import { GraphQLBoolean, GraphQLInt, GraphQLList} from 'graphql';
import connection from '../../middleware/db.js'
import { FeedPostType } from '../TypeDefs/Posts.js';
import {SavesType} from '../TypeDefs/Saves.js'

let saves = []
let saved = []

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
        let sql = `SELECT saves.postID,saves.userID,post_text,date_posted,url,username,first_name,last_name,profile_picture FROM saves JOIN posts ON posts.postID=saves.postID JOIN users ON users.userID=posts.userID WHERE saves.userID=${userID}`
        connection.query(sql, (err, result)=>{
            if (err) throw err;
            result = JSON.parse(JSON.stringify(result))
            saved = result
        })
        return saved
    }
}

