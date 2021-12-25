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
        last_seen: {type:GraphQLString},
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

export const UserInfoType = new GraphQLObjectType({
    name:'UserInfo',
    fields: () => ({
        userID: {type: GraphQLInt},
        job: {type: GraphQLString},
        university: {type: GraphQLString},
        high_school: {type: GraphQLString},
        bDate: {type: GraphQLString},
        phone_number: {type: GraphQLString},
        gender: {type: GraphQLString},
        date_joined: {type: GraphQLString},
        interests: {type: GraphQLString},
        error: {type: GraphQLString},
        country: {type: GraphQLString},
        city: {type: GraphQLString}
    })
})

export const BlockUserType = new GraphQLObjectType({
    name:'BlockUser',
    fields:()=>({
        blockerId: {type:GraphQLInt},
        blockedId: {type:GraphQLInt}
    })
})