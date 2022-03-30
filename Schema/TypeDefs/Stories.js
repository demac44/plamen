import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
 } from "graphql";


export const StoryType = new GraphQLObjectType({
    name: 'Story',
    fields: ()=>({
        storyID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        url: {type: GraphQLString},
        date_posted: {type: GraphQLString},
        type: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        username: {type: GraphQLString},
        profile_picture: {type:GraphQLString},
        stories:{type: new GraphQLList(StoryType)},
        storyHeads:{type:new GraphQLList(StoryType)},
        allStories:{type:new GraphQLList(StoryType)},
        userIDs: {type: new GraphQLList(StoryType)}
    })
})
