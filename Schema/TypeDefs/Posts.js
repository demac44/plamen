import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
 } from "graphql";
import { CommentType } from "./Comments.js";
import { LikesType } from "./Likes.js";

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: ()=>({
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        post_text: {type: GraphQLString},
        date_posted: {type: GraphQLString},
        url: {type: GraphQLString},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: new GraphQLList(LikesType)}
    })
})


export const FeedPostType = new GraphQLObjectType({
    name: 'FeedPost',
    fields: ()=>({
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        post_text: {type: GraphQLString},
        date_posted: {type: GraphQLString},
        url: {type: GraphQLString},
        username: {type: GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        profile_picture: {type: GraphQLString},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: new GraphQLList(LikesType)},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt}
    })
})