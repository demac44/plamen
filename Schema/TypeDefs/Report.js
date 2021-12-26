import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
 } from "graphql";


export const ReportType = new GraphQLObjectType({
    name: 'ReportPost',
    fields: ()=>({
        reportID: {type:GraphQLInt},
        postID: {type:GraphQLInt},
        userPostedID: {type:GraphQLInt},
        userReportedID: {type:GraphQLInt},
        date_reported:{type:GraphQLString},
        reasons:{type:GraphQLString},
        reporterId: {type: GraphQLInt}
    })
})

export const GroupReportedPost = new GraphQLObjectType({
    name:'ReportedPosts',
    fields: ()=>({
        reportID: {type:GraphQLInt},
        date_reported:{type:GraphQLString},
        reasons:{type:GraphQLString},
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
        groupID: {type: GraphQLInt}
    })
})