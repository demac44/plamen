import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
 } from "graphql";


export const LikesType = new GraphQLObjectType({
    name: 'LikePost',
    fields: ()=>({
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        username: {type:GraphQLString},
        first_name: {type:GraphQLString},
        last_name: {type:GraphQLString},
        profile_picture: {type:GraphQLString}
    })
})
