import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean
 } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        userID: {type: GraphQLInt},
        username: {type: GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        email:{type:GraphQLString},
        pass:{type:GraphQLString},
        gender: {type: GraphQLString},
        birth_date: {type: GraphQLString},
        date_registered: {type: GraphQLString},
        profile_picture: {type: GraphQLString},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt},
    })
})

export const PasswordType = new GraphQLObjectType({
    name: 'Pass',
    fields:()=>({
        userID: {type: GraphQLInt},
        oldPassword: {type: GraphQLString},
        newPassword: {type: GraphQLString},
        changed: {type: GraphQLBoolean},
        error: {type: GraphQLString}
    })
})