import { 
    GraphQLObjectType,
    GraphQLSchema,
} from "graphql";

import { pubsub } from "../server.js";

import { CREATE_CHAT, DELETE_CHAT, DELETE_MESSAGE, MSG_NOTIFICATION, SEEN, SEND_MESSAGE } from "./Mutations/Chat.js";
import { ADD_COMMENT, REMOVE_COMMENT } from "./Mutations/Comments.js";
import { EDIT_INFO, EDIT_PFP } from "./Mutations/Edit.js";
import { FOLLOW_USER, UNFOLLOW_USER } from "./Mutations/Followings.js";
import { ACCEPT_REQUEST, ADD_GP_COMMENT, CREATE_GROUP, CREATE_GROUP_POST, DELETE_GROUP_POST, DENY_REQUEST, JOIN_GROUP, JOIN_REQUEST, LEAVE_GROUP, LIKE_GP_POST, REMOVE_GP_COMMENT, REMOVE_GP_LIKE, REMOVE_REQUEST, REMOVE_SAVED_GP, SAVE_GP } from "./Mutations/Groups.js";
import { LIKE_POST, REMOVE_LIKE } from "./Mutations/Likes.js";
import { CLEAR_NOTIFICATIONS, COMM_NOTIFICATION, FOLLOW_NOTIFICATION, LIKE_NOTIFICATION, REMOVE_COMMENT_NOTIF, REMOVE_FOLLOW_NOTIF, REMOVE_LIKE_NOTIF } from "./Mutations/Notifications.js";
import { CREATE_POST, DELETE_POST } from "./Mutations/Posts.js";
import { POST_REPORT } from "./Mutations/Report.js";
import { REMOVE_SAVED, SAVE_POST } from "./Mutations/Saves.js";
import { CREATE_STORY, DELETE_STORY } from "./Mutations/Stories.js";
import { CREATE_USER } from "./Mutations/Users.js";
import { CHAT_EXISTS, COUNT_ALL_MSGS, COUNT_MSGS, GET_CHAT, GET_CHAT_LIST, GET_CHAT_MEDIA, GET_MESSAGES, LAST_MESSAGE } from "./Queries/Chat.js";
import { GET_FOLLOWERS, GET_FOLLOWING, IF_FOLLOWING } from "./Queries/Followings.js";
import { GET_GROUP, GET_GROUPS, GET_GROUP_MEMBERS, GET_GROUP_POSTS, GET_GROUP_USER, IF_REQUESTED } from "./Queries/Groups.js";
import { GET_NOTIFICATIONS } from "./Queries/Notifications.js";
import { GET_FEED_POSTS, GET_POST, GET_POST_COMMENTS, GET_POST_LIKES, GET_PROFILE_POSTS, GET_SAVED_POSTS, IF_LIKED, IF_SAVED } from "./Queries/Posts.js";
import { GET_STORIES, GET_USER_STORIES } from "./Queries/Stories.js";
import { GET_USER, GET_ALL_USERS } from "./Queries/Users.js";
import { ChatMessagesType, MsgNotificationType } from "./TypeDefs/Chat.js";
import { NotificationType } from "./TypeDefs/Notifications.js";

const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        // users
        get_user: GET_USER,
        get_users: GET_ALL_USERS,
        ifFollowing: IF_FOLLOWING,
        get_followers: GET_FOLLOWERS,
        get_following: GET_FOLLOWING,
        // posts
        get_post: GET_POST,
        get_profile_posts: GET_PROFILE_POSTS,
        get_feed_posts: GET_FEED_POSTS,
        get_post_comments: GET_POST_COMMENTS,
        get_post_likes: GET_POST_LIKES,
        if_liked: IF_LIKED,
        // saved posts
        if_saved: IF_SAVED,
        get_saved_posts: GET_SAVED_POSTS,
        // chats
        chat_exists: CHAT_EXISTS,
        get_chats: GET_CHAT_LIST,
        get_messages: GET_MESSAGES,
        get_chat_media: GET_CHAT_MEDIA,
        get_chat: GET_CHAT,
        last_message: LAST_MESSAGE,
        count_newMsgs: COUNT_ALL_MSGS,
        count_msgs: COUNT_MSGS,
        // stories
        get_stories: GET_STORIES,
        get_user_stories: GET_USER_STORIES,
        // notifications
        get_notifications: GET_NOTIFICATIONS,
        // groups
        get_groups:GET_GROUPS,
        get_group: GET_GROUP,
        get_group_members: GET_GROUP_MEMBERS,
        get_group_posts: GET_GROUP_POSTS,
        get_group_user: GET_GROUP_USER,
        if_requested: IF_REQUESTED
    }
})    

const RootMutation = new GraphQLObjectType({
    name:'RootMutation',
    fields: {
        // users
        new_user: CREATE_USER,
        new_post: CREATE_POST,
        follow: FOLLOW_USER,
        unfollow: UNFOLLOW_USER,
        edit_pfp: EDIT_PFP,
        edit_info: EDIT_INFO,
        // posts
        delete_post: DELETE_POST,
        like_post: LIKE_POST,
        remove_like: REMOVE_LIKE,
        save_post: SAVE_POST,
        remove_saved: REMOVE_SAVED,
        add_comment: ADD_COMMENT,
        delete_comment: REMOVE_COMMENT,
        // stories
        create_story: CREATE_STORY,
        delete_story: DELETE_STORY,
        // chats
        create_chat: CREATE_CHAT,
        send_message: SEND_MESSAGE,
        delete_chat: DELETE_CHAT,
        delete_message: DELETE_MESSAGE,
        post_report: POST_REPORT,
        msg_notification: MSG_NOTIFICATION,
        seen: SEEN,
        // notifications
        like_notification: LIKE_NOTIFICATION,
        comment_notification: COMM_NOTIFICATION,
        follow_notification: FOLLOW_NOTIFICATION,
        clear_notifications: CLEAR_NOTIFICATIONS,
        remove_like_notif: REMOVE_LIKE_NOTIF,
        remove_follow_notif: REMOVE_FOLLOW_NOTIF,
        remove_comment_notif: REMOVE_COMMENT_NOTIF,
        // groups
        create_group: CREATE_GROUP,
        create_group_post: CREATE_GROUP_POST,
        delete_group_post: DELETE_GROUP_POST,
        like_gp: LIKE_GP_POST,
        remove_gp_like:REMOVE_GP_LIKE,
        comment_gp: ADD_GP_COMMENT,
        remove_gp_cmt: REMOVE_GP_COMMENT,
        save_gp: SAVE_GP,
        remove_saved_gp: REMOVE_SAVED_GP,
        join_group: JOIN_GROUP,
        leave_group: LEAVE_GROUP,
        join_request: JOIN_REQUEST,
        remove_request: REMOVE_REQUEST,
        accept_request: ACCEPT_REQUEST,
        deny_request: DENY_REQUEST
    }
})

const RootSubscription = new GraphQLObjectType({
    name:'RootSubscription',
    fields: {
        newMessage: {
            type: ChatMessagesType,
            subscribe: () => pubsub.asyncIterator(["NEW_MESSAGE"])
        },
        newMsgNotification: {
            type: MsgNotificationType,
            subscribe: () => pubsub.asyncIterator(["MSG_NOTIFICATION"])
        },
        newNotification: {
            type: NotificationType,
            subscribe: () => pubsub.asyncIterator(["NOTIFICATION"]) 
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
})