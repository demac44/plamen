import { 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
 } from "graphql";


export const ChatType = new GraphQLObjectType({
    name: 'ChatType',
    fields: () => ({
        chatID: {type: GraphQLInt},
        user1_ID: {type: GraphQLInt},
        user2_ID: {type: GraphQLInt},
        date_created: {type: GraphQLString}
    })
})

export const ChatMessagesType = new GraphQLObjectType({
    name:'ChatMessages',
    fields: ()=>({
        msgID: {type: GraphQLInt},
        chatID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        time_sent: {type: GraphQLString},
        msg_text: {type: GraphQLString},
        url: {type: GraphQLString},
        type: {type: GraphQLString},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt}
    })
})

export const ChatListType = new GraphQLObjectType({
    name: 'ChatList',
    fields: ()=>({
        chatID: {type: GraphQLInt},
        first_name: {type:GraphQLString},
        last_name: {type:GraphQLString},
        username: {type:GraphQLString},
        profile_picture: {type:GraphQLString},
        userID: {type:GraphQLInt},
        msg_text: {type: GraphQLString},
        mid: {type: GraphQLInt},
        date_created:{type: GraphQLString},
        type: {type: GraphQLString}
    })
})

export const MsgNotificationType = new GraphQLObjectType({
    name:'MsgNotification',
    fields:()=>({
        Nid: {type: GraphQLInt},
        chatID: {type: GraphQLInt},
        sender_id: {type: GraphQLInt},
        receiver_id: {type: GraphQLInt},
        msgCount:{type:GraphQLInt}
    })
})