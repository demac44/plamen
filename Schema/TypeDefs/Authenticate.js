import { 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString
 } from "graphql";

export const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: ()=>({
        userID: {type: GraphQLInt},
        username: {type: GraphQLString}
    })
})