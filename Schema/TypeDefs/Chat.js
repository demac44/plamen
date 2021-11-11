import { 
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
 } from "graphql";


export const ChatType = new GraphQLObjectType({
    name: 'ChatType',
    fields: () => ({
        chatID:{type:GraphQLString},
        date_created: {type:GraphQLString}
    })
})

export const CreateChatType = new GraphQLObjectType({
    name: 'CreateChat',
    fields: ()=>({
        chatID: {type: GraphQLString},
        chatID2: {type: GraphQLString},
        userID: {type: GraphQLInt},
        second_userID: {type: GraphQLInt}
    })
})

export const ChatHeadsType = new GraphQLObjectType({
    name: 'ChatHeads',
    fields: ()=>({
        chatID: {type: GraphQLString},
        first_name: {type:GraphQLString},
        last_name: {type:GraphQLString},
        profile_picture: {type:GraphQLString},
        userID: {type:GraphQLInt}
    })
})

export const ChatMessagesType = new GraphQLObjectType({
    name:'ChatMessages',
    fields: ()=>({
        msgID: {type: GraphQLInt},
        chatID: {type: GraphQLString},
        userID: {type: GraphQLInt},
        time_sent: {type: GraphQLString},
        msg_text: {type: GraphQLString},
        url: {type: GraphQLString}
    })
})
