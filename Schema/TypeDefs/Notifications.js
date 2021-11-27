import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
 } from "graphql";


export const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: ()=>({
        Nid:{type:GraphQLInt},
        sender_id:{type:GraphQLInt},
        receiver_id:{type:GraphQLInt},
        postID:{type:GraphQLInt},
        group_id:{type:GraphQLInt},
        time_sent:{type:GraphQLString},
        type:{type:GraphQLString},
        profile_picture: {type:GraphQLString},
        username: {type:GraphQLString},
    })
})
