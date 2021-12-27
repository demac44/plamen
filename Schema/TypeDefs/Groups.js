import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
 } from "graphql";



export const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: ()=>({
        groupID: {type: GraphQLInt},
        group_name: {type: GraphQLString},
        group_creator_id: {type: GraphQLInt},
        date_created: {type:GraphQLString},
        closed: {type:GraphQLBoolean},
        group_description: {type:GraphQLString},
        group_rules: {type:GraphQLString},
        group_tags: {type:GraphQLString},
        banner_image: {type:GraphQLString}
    })
})

export const GroupPostType = new GraphQLObjectType({
    name: 'GroupPost',
    fields: ()=>({
        groupID: {type: GraphQLInt},
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        post_text: {type: GraphQLString},
        date_posted: {type: GraphQLString},
        url: {type: GraphQLString},
        username: {type: GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        profile_picture: {type: GraphQLString},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt},
        type:{type:GraphQLString},
        groupPost:{type: GraphQLBoolean}
    })
})

export const GroupUserType = new GraphQLObjectType({
    name: 'GroupUser',
    fields: ()=>({
        userID: {type: GraphQLInt},
        groupID: {type: GraphQLInt},
        username: {type: GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        email:{type:GraphQLString},
        pass:{type:GraphQLString},
        gender: {type: GraphQLString},
        birth_date: {type: GraphQLString},
        date_joined: {type: GraphQLString},
        profile_picture: {type: GraphQLString},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt},
        role:{type:GraphQLString},
        roleID:{type:GraphQLInt},
        permissions:{type:GraphQLString}
    })
})
