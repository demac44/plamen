import { 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
 } from "graphql";

export const ChatMessagesType = new GraphQLObjectType({
    name:'ChatMessages',
    fields: ()=>({
        msgID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        time_sent: {type: GraphQLString},
        msg_text: {type: GraphQLString},
        url: {type: GraphQLString},
        type: {type: GraphQLString},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
        groupChatId: {type: GraphQLInt},
        username: {type: GraphQLString},
        profile_picture:{type:GraphQLString},
        storyID: {type: GraphQLInt},
        sender:{type:GraphQLString},
        receiver:{type:GraphQLString},
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
        type: {type: GraphQLString},
        groupChatId:{type:GraphQLInt},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt},
        error: {type: GraphQLString},
        last_seen: {type: GraphQLString}
    })
})

export const MsgNotificationType = new GraphQLObjectType({
    name:'MsgNotification',
    fields:()=>({
        Nid: {type: GraphQLInt},
        msgCount:{type:GraphQLInt},
        sender:{type:GraphQLString},
        receiver:{type:GraphQLString},
    })
})

export const GroupChatType = new GraphQLObjectType({
    name:'GroupChat',
    fields:()=>({
        groupChatId: {type:GraphQLInt},
        userID: {type:GraphQLInt},
        date_created: {type: GraphQLString},
        admin: {type: GraphQLInt},
        name: {type:GraphQLString},
        date_created: {type:GraphQLString},
        group_image: {type:GraphQLString}
    })
})