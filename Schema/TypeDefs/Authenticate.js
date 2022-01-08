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

export const VerifyEmailCodesType = new GraphQLObjectType({
    name:"VerifyEmailCode",
    fields:()=>({
        email: {type: GraphQLString},
        code: {type: GraphQLString}
    })
})