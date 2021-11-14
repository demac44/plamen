import { 
    GraphQLInt,
    GraphQLList,
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

export const CreateChatType = new GraphQLObjectType({
    name: 'CreateChat',
    fields: ()=>({
        user1: {type: GraphQLInt},
        user2: {type: GraphQLInt},
        chatID: {type: GraphQLInt}
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
        url: {type: GraphQLString}
    })
})

export const ChatHeadsType = new GraphQLObjectType({
    name: 'ChatHeads',
    fields: ()=>({
        chatID: {type: GraphQLInt},
        first_name: {type:GraphQLString},
        last_name: {type:GraphQLString},
        username: {type:GraphQLString},
        profile_picture: {type:GraphQLString},
        userID: {type:GraphQLInt},
        msg_text: {type: GraphQLString},
        mid: {type: GraphQLInt},
        date_created:{type: GraphQLString}
    })
})