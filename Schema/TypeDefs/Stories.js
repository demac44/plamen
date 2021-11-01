import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
 } from "graphql";


export const StoryType = new GraphQLObjectType({
    name: 'Story',
    fields: ()=>({
        id: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        url: {type: GraphQLString},
        time_posted: {type: GraphQLString}
    })
})
