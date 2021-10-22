import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
 } from "graphql";
import { GetCommentType } from "./Comments.js";

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: ()=>({
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        post_text: {type: GraphQLString},
        date_posted: {type: GraphQLString},
        url: {type: GraphQLString},
        comments: {type: new GraphQLList(GetCommentType)}
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
        comments: {type: new GraphQLList(GetCommentType)}
    })
})