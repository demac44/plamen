import { 
    GraphQLObjectType,
    GraphQLInt,
 } from "graphql";

export const FollowType = new GraphQLObjectType({
    name: 'Follow',
    fields: ()=>({
        followerID: {type: GraphQLInt},
        followedID: {type: GraphQLInt}
    })
})