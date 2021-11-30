import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
 } from "graphql";

 
export const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields:()=>({
        commentID: {type:GraphQLInt},
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        comment_text: {type: GraphQLString},
        date_commented: {type: GraphQLString},
        userID: {type: GraphQLInt},
        username: {type:GraphQLString},
        profile_picture: {type: GraphQLString}
    })
})