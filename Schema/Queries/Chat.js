import { GraphQLInt, GraphQLList, GraphQLBoolean, GraphQLString } from 'graphql';
import connection from '../../middleware/db.js'
import { ChatListType, ChatMessagesType, GroupChatType, MsgNotificationType } from '../TypeDefs/Chat.js';

import CryptoJS from 'crypto-js'

export const GET_CHAT_LIST = {
    type: new GraphQLList(ChatListType),
    args:{
        username: {type: GraphQLString}
    },
    async resolve(_, args){
        const {username} = args
        return await connection.promise().query(`
            SELECT userID,first_name,last_name,username,profile_picture,last_seen,MAX(time_sent) FROM messages
            JOIN users ON (receiver=users.username OR sender=users.username)
            WHERE receiver="${username}" OR sender="${username}"
            GROUP BY users.username
            ORDER BY MAX(time_sent) DESC`
        ).then((res)=>{return res[0]})
    }  
 }

export const GET_GROUP_CHAT = {
    type: GroupChatType,
    args:{
        groupChatId: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupChatId} = args
        return await connection.promise().query(`
            SELECT name, admin, groupChatId 
            FROM group_chats
            WHERE groupChatId=${groupChatId}
        `).then(res => {return res[0][0]})
    }
}


export const LAST_MESSAGE = {
    type: ChatMessagesType,
    args:{
        sender: {type: GraphQLString},
        receiver: {type: GraphQLString}
    },
    async resolve(_, args){
        const {receiver, sender} = args
        return await connection.promise().query(`
            SELECT msg_text, type, receiver, sender FROM messages 
            WHERE (sender="${sender}" AND receiver="${receiver}")
            OR (sender="${receiver}" AND receiver="${sender}")
            ORDER BY msgID DESC LIMIT 1`
        ).then(response => {
            if(response[0][0]?.msg_text){     
                const decrypted = CryptoJS.AES.decrypt(response[0][0]?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
                const res = {...response[0][0], msg_text: decrypted}
                return res
            }
            return
        })
    }
}
 
export const GET_MESSAGES = {
    type: new GraphQLList(ChatMessagesType),
    args: {
        sender: {type: GraphQLString},
        receiver: {type: GraphQLString},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
    },
    async resolve(_, args) {
        const {sender, receiver, limit, offset} = args
        const result = await connection.promise().query(`
            SELECT msgID, msg_text, time_sent, sender, receiver, type, url, storyID  
            FROM messages 
            WHERE (sender="${sender}" AND receiver="${receiver}")
            OR (sender="${receiver}" AND receiver="${sender}")
            ORDER BY msgID DESC 
            LIMIT ${limit} OFFSET ${offset}
        `).then((res)=>{return res[0]})
        await result.map(msg => {
            const decrypted = CryptoJS.AES.decrypt(msg?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            Object.assign(msg, {msg_text: decrypted})
        })
        return result
    }
}

export const GET_CHAT_MEDIA = {
    type: new GraphQLList(ChatMessagesType),
    args:{
        sender: {type: GraphQLString},
        receiver: {type: GraphQLString},
    },
    async resolve(_, args){
        const {receiver, sender} = args
        return await connection.promise().query(`
            SELECT msgID, userID, url, type FROM messages 
            WHERE (sender="${sender}" AND receiver="${receiver}")
            OR (sender="${receiver}" AND receiver="${sender}") 
            AND (type="image" OR type="video")
        `).then((res)=>{return res[0]})
    }
}

// counting all unread messages
export const COUNT_ALL_MSGS = {
    type: MsgNotificationType,
    args:{
        receiver:{type:GraphQLString}
    },
    async resolve(_, args){
        const {receiver} = args
        return await connection.promise().query(`
            SELECT COUNT(1) AS msgCount 
            FROM msg_notifications 
            WHERE receiver="${receiver}"
        `).then((res)=>{return res[0][0]})
    }
}

// counting unread messages for particular chat
export const CHECK_UNREAD_MSG = {
    type: GraphQLBoolean,
    args: {
        receiver:{type:GraphQLString}
    },
    async resolve(_, args){
        const {receiver} = args
        return await connection.promise().query(`
            SELECT EXISTS(SELECT 1 FROM msg_notifications WHERE receiver="${receiver}" LIMIT 1) as ifUnreadMsg
        `).then((res)=>{return res[0][0]?.ifUnreadMsg===1 ? true : false})
    }
}

// GROUP CHATS


export const GET_GROUP_CHATS = {
    type: new GraphQLList(GroupChatType),
    args:{
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {userID} = args
        return await connection.promise().query(`
            SELECT group_chats_members.groupChatId, name, group_image 
            FROM group_chats_members
            JOIN group_chats ON group_chats_members.groupChatId=group_chats.groupChatId
            WHERE userID=${userID}
        `).then((res)=>{return res[0]})
    } 
}

export const GET_GROUP_MESSAGES = {
    type: new GraphQLList(ChatMessagesType),
    args: {
        groupChatId: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        offset: {type: GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args) {
        const {groupChatId, limit, offset, userID} = args
        const result = await connection.promise().query(`
            SELECT msg_text, time_sent, groupChatId, username, type, url, users.userID, profile_picture, msgID 
            FROM group_chats_messages 
            JOIN users ON group_chats_messages.userID=users.userID
            WHERE groupChatId=${groupChatId}
            AND NOT EXISTS (
            (SELECT 1
            FROM blocked_users
            WHERE
                (blockerId = ${userID} AND blockedId = users.userID)
                    OR
                (blockerId = users.userID AND blockedId = ${userID})
            )
            ) 
            ORDER BY msgID DESC 
            LIMIT ${limit} OFFSET ${offset}
        `).then((res)=>{return res[0]})
        await result.map(msg => {
            const decrypted = CryptoJS.AES.decrypt(msg?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            Object.assign(msg, {msg_text: decrypted})
        })
        return result
    }
}

export const LAST_MESSAGE_GROUP = {
    type: ChatMessagesType,
    args:{
        groupChatId:{type:GraphQLInt}
    },
    async resolve(_, args){
        const {groupChatId} = args
        return await connection.promise().query(`
            SELECT msg_text, type, userID FROM group_chats_messages WHERE groupChatId=${groupChatId} ORDER BY msgID DESC LIMIT 1
        `).then(response => {
            if(response[0][0]?.msg_text){
                const decrypted = CryptoJS.AES.decrypt(response[0][0]?.msg_text, process.env.MESSAGE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
                const res = {...response[0][0], msg_text: decrypted}
                return res
            }
            return
        })
    }
}

export const GET_GROUP_CHAT_MEMBERS = {
    type: new GraphQLList(ChatListType),
    args:{
        groupChatId: {type:GraphQLInt},
        limit: {type: GraphQLInt},
        offset:{type:GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupChatId, limit, offset, userID} = args
        return await connection.promise().query(`
            SELECT first_name, last_name, users.userID, username, profile_picture
            FROM group_chats_members
            JOIN users ON group_chats_members.userID=users.userID
            WHERE groupChatId=${groupChatId}
            AND NOT EXISTS (
            (SELECT 1
            FROM blocked_users
            WHERE
                (blockerId = ${userID} AND blockedId = users.userID)
                    OR
                (blockerId = users.userID AND blockedId = ${userID})
            )
            ) 
            LIMIT ${limit} OFFSET ${offset}
        `).then(res=>{return res[0]})
    }
}

export const GET_GROUP_CHAT_MEMBER = {
    type: ChatListType,
    args:{
        groupChatId: {type:GraphQLInt},
        userID: {type: GraphQLInt}
    },
    async resolve(_, args){
        const {groupChatId, userID} = args
        return await connection.promise().query(`
            SELECT * FROM group_chats_members WHERE groupChatId=${groupChatId} AND userID=${userID}
        `).then(res=>{return res[0][0]})
    } 
}
