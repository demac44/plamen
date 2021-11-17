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
        reasons:{type:GraphQLString}
    })
})
