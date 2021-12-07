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
        url: {type: GraphQLString},
        username: {type: GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        profile_picture: {type: GraphQLString},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt},
        type:{type:GraphQLString}
    })
})