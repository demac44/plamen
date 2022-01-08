import { 
    GraphQLBoolean,
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

export const VerifyEmailType = new GraphQLObjectType({
    name:"VerifyEmail",
    fields:()=>({
        email: {type: GraphQLString},
        code: {type: GraphQLString},
        error: {type: GraphQLBoolean}
    })
})