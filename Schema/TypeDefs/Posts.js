import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
 } from "graphql";

export const TextPostType = new GraphQLObjectType({
    name: 'TextPost',
    fields: ()=>({
        tpostID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        post_content: {type: GraphQLString},
        date_published: {type: GraphQLString},
        updated: {type: GraphQLBoolean},
        date_updated: {type: GraphQLString}
    })
})