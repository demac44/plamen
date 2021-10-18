import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
 } from "graphql";

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: ()=>({
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        post_text: {type: GraphQLString},
        date_posted: {type: GraphQLString},
        url: {type: GraphQLString}
    })
})