import { 
    GraphQLObjectType,
    GraphQLSchema,
} from "graphql";

import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();

import { CREATE_CHAT, DELETE_CHAT, DELETE_MESSAGE, MSG_NOTIFICATION, SEEN, SEND_MESSAGE } from "./Mutations/Chat.js";
import { ADD_COMMENT, REMOVE_COMMENT } from "./Mutations/Comments.js";
import { EDIT_INFO, EDIT_PFP } from "./Mutations/Edit.js";
import { FOLLOW_USER, UNFOLLOW_USER } from "./Mutations/Followings.js";
import { ADD_GP_COMMENT, CREATE_GROUP, CREATE_GROUP_POST, DELETE_GROUP_POST, LIKE_GP_POST, REMOVE_GP_COMMENT, REMOVE_GP_LIKE } from "./Mutations/Groups.js";
import { LIKE_POST, REMOVE_LIKE } from "./Mutations/Likes.js";
import { CLEAR_NOTIFICATIONS, COMM_NOTIFICATION, FOLLOW_NOTIFICATION, LIKE_NOTIFICATION, REMOVE_COMMENT_NOTIF, REMOVE_FOLLOW_NOTIF, REMOVE_LIKE_NOTIF } from "./Mutations/Notifications.js";
import { CREATE_POST, DELETE_POST } from "./Mutations/Posts.js";
import { POST_REPORT } from "./Mutations/Report.js";
import { REMOVE_SAVED, SAVE_POST } from "./Mutations/Saves.js";
import { CREATE_STORY, DELETE_STORY } from "./Mutations/Stories.js";
import { CREATE_USER } from "./Mutations/Users.js";
import { CHAT_EXISTS, COUNT_ALL_MSGS, COUNT_MSGS, GET_CHAT, GET_CHAT_LIST, GET_CHAT_MEDIA, GET_MESSAGES, LAST_MESSAGE } from "./Queries/Chat.js";
import { GET_FOLLOWERS, GET_FOLLOWING, IF_FOLLOWING } from "./Queries/Followings.js";
import { GET_GROUP, GET_GROUPS, GET_GROUP_POSTS, GET_GROUP_USER } from "./Queries/Groups.js";
import { GET_NOTIFICATIONS } from "./Queries/Notifications.js";
import { GET_FEED_POSTS, GET_POST, GET_POSTS } from "./Queries/Posts.js";
import { GET_SAVES, IF_SAVED } from "./Queries/Saves.js";
import { GET_STORIES, GET_USER_STORIES } from "./Queries/Stories.js";
import { GET_USER, GET_ALL_USERS } from "./Queries/Users.js";
import { ChatMessagesType, MsgNotificationType } from "./TypeDefs/Chat.js";
import { NotificationType } from "./TypeDefs/Notifications.js";

const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        user: GET_USER,
        users: GET_ALL_USERS,
        posts: GET_POSTS,
        get_post: GET_POST,
        ifFollowing: IF_FOLLOWING,
        getFollowers: GET_FOLLOWERS,
        getFollowing: GET_FOLLOWING,
        feed_posts: GET_FEED_POSTS,
        if_saved: IF_SAVED,
        get_saves: GET_SAVES,
        chat_exists: CHAT_EXISTS,
        get_chats: GET_CHAT_LIST,
        get_messages: GET_MESSAGES,
        get_chat_media: GET_CHAT_MEDIA,
        get_chat: GET_CHAT,
        last_message: LAST_MESSAGE,
        get_stories: GET_STORIES,
        get_user_stories: GET_USER_STORIES,
        count_newMsgs: COUNT_ALL_MSGS,
        count_msgs: COUNT_MSGS,
        get_notifications: GET_NOTIFICATIONS,
        get_groups:GET_GROUPS,
        get_group: GET_GROUP,
        get_group_posts: GET_GROUP_POSTS,
        get_group_user: GET_GROUP_USER
    }
})    

const RootMutation = new GraphQLObjectType({
    name:'RootMutation',
    fields: {
        new_user: CREATE_USER,
        new_post: CREATE_POST,
        delete_post: DELETE_POST,
        follow: FOLLOW_USER,
        unfollow: UNFOLLOW_USER,
        like_post: LIKE_POST,
        remove_like: REMOVE_LIKE,
        save_post: SAVE_POST,
        remove_saved: REMOVE_SAVED,
        add_comment: ADD_COMMENT,
        remove_comment: REMOVE_COMMENT,
        edit_pfp: EDIT_PFP,
        edit_info: EDIT_INFO,
        create_story: CREATE_STORY,
        delete_story: DELETE_STORY,
        create_chat: CREATE_CHAT,
        send_message: SEND_MESSAGE,
        delete_chat: DELETE_CHAT,
        delete_message: DELETE_MESSAGE,
        post_report: POST_REPORT,
        msg_notification: MSG_NOTIFICATION,
        seen: SEEN,
        like_notification: LIKE_NOTIFICATION,
        comment_notification: COMM_NOTIFICATION,
        follow_notification: FOLLOW_NOTIFICATION,
        clear_notifications: CLEAR_NOTIFICATIONS,
        remove_like_notif: REMOVE_LIKE_NOTIF,
        remove_follow_notif: REMOVE_FOLLOW_NOTIF,
        remove_comment_notif: REMOVE_COMMENT_NOTIF,
        create_group: CREATE_GROUP,
        create_group_post: CREATE_GROUP_POST,
        delete_group_post: DELETE_GROUP_POST,
        like_gp_post: LIKE_GP_POST,
        remove_gp_like:REMOVE_GP_LIKE,
        comment_gp_post: ADD_GP_COMMENT,
        remove_gp_comment: REMOVE_GP_COMMENT
    }
})

const RootSubscription = new GraphQLObjectType({
    name:'RootSubscription',
    fields: {
        newMessage: {
            type: ChatMessagesType,
            subscribe: () => pubsub.asyncIterator('NEW_MESSAGE')
        },
        newMsgNotification: {
            type: MsgNotificationType,
            subscribe: () => pubsub.asyncIterator('MSG_NOTIFICATION')
        },
        newNotification: {
            type: NotificationType,
            subscribe: () => pubsub.asyncIterator("NOTIFICATION")
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
})