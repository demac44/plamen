import { 
    GraphQLObjectType,
    GraphQLSchema,
} from "graphql";

import { pubsub } from "../server.js";

import { ADD_GROUP_CHAT_USER, CREATE_CHAT, CREATE_GROUP_CHAT, DELETE_CHAT, DELETE_GROUP_CHAT, DELETE_GROUP_CHAT_MESSAGE, 
        DELETE_MESSAGE, LEAVE_GROUP_CHAT_ADMIN, LEAVE_GROUP_CHAT_MEMBER, MSG_NOTIFICATION, REMOVE_GROUP_CHAT_MEMBER, SEEN, 
        SEND_GROUP_MESSAGE, SEND_MESSAGE } from "./Mutations/Chat.js";
        
import { ADD_COMMENT, REMOVE_COMMENT } from "./Mutations/Comments.js";
import { CHANGE_PASSWORD, EDIT_INFO, EDIT_PFP } from "./Mutations/Edit.js";
import { FOLLOW_USER, UNFOLLOW_USER } from "./Mutations/Followings.js";

import { ACCEPT_REQUEST, ADD_GP_COMMENT, ALLOW_REPORTED_POST, CHANGE_COMMUNITY_BANNER, CHANGE_GROUP_BANNER_IMG, 
        CHANGE_GROUP_INFO, CHANGE_GROUP_NAME, CHANGE_GROUP_TAGS, CHANGE_MEMBER_ROLE, 
        CHANGE_VISIBILITY, CREATE_GROUP, CREATE_GROUP_POST, DELETE_GROUP_POST, 
        DENY_REQUEST, JOIN_GROUP, JOIN_REQUEST, LEAVE_GROUP, LIKE_GP_POST, REMOVE_GP_COMMENT, 
        REMOVE_GP_LIKE, REMOVE_GROUP_USER, REMOVE_REPORTED_POST, REMOVE_REQUEST, REMOVE_SAVED_GP, 
        REPORT_GROUP_POST, SAVE_GP, SEND_COMMUNITY_MESSAGE } from "./Mutations/Groups.js";

import { LIKE_POST, REMOVE_LIKE } from "./Mutations/Likes.js";
import { CLEAR_NOTIFICATIONS, COMM_NOTIFICATION, FOLLOW_NOTIFICATION, LIKE_NOTIFICATION, 
        REMOVE_COMMENT_NOTIF, REMOVE_FOLLOW_NOTIF, REMOVE_LIKE_NOTIF } from "./Mutations/Notifications.js";
import { CREATE_POST, DELETE_POST } from "./Mutations/Posts.js";
import { POST_REPORT } from "./Mutations/Report.js";
import { REMOVE_SAVED, SAVE_POST } from "./Mutations/Saves.js";
import { CREATE_STORY, DELETE_STORY, REPLY_TO_STORY } from "./Mutations/Stories.js";
import { BLOCK_USER, CHANGE_ACTIVITY_STATUS, CREATE_USER, DELETE_ACCOUNT, DISABLE_ACCOUNT, EDIT_BDATE, 
        EDIT_GENDER, EDIT_INTERESTS, EDIT_USER_INFO, SET_LAST_SEEN, UNBLOCK_USER, UNDISABLE_ACCOUNT } from "./Mutations/Users.js";

import { CHAT_EXISTS, COUNT_ALL_MSGS, COUNT_MSGS, GET_ALL_USER_CHATS, GET_GROUP_CHATS, GET_CHAT_LIST, 
        GET_CHAT_MEDIA, GET_MESSAGES, LAST_MESSAGE, GET_ALL_GROUP_CHATS, GET_GROUP_MESSAGES, LAST_MESSAGE_GROUP, 
        GET_GROUP_CHAT_MEMBERS, GET_GROUP_CHAT_MEMBER } from "./Queries/Chat.js";

import { GET_FOLLOWERS, GET_FOLLOWING, IF_FOLLOWING } from "./Queries/Followings.js";

import { GET_ALL_GROUPS, GET_GROUP, GET_GROUPS, GET_GROUP_JOIN_REQUESTS, GET_GROUP_MEMBERS, GET_GROUP_POSTS,
         GET_GROUP_POST_COMMENTS, GET_GROUP_POST_LIKES, GET_GROUP_REPORTED_POSTS, GET_GROUP_USER, GET_SAVED_GROUP_POSTS, 
         IF_GROUP_POST_LIKED, IF_GROUP_POST_SAVED, IF_REQUESTED, GET_COMMUNITY_MESSAGES, GET_COMMUNITY_SAVED_POSTS } from "./Queries/Groups.js";
import { GET_NOTIFICATIONS } from "./Queries/Notifications.js";
import { GET_FEED_POSTS, GET_POST, GET_POST_COMMENTS, GET_POST_LIKES, GET_PROFILE_POSTS, GET_SAVED_POSTS, IF_LIKED, 
        IF_SAVED, RANDOM_POSTS } from "./Queries/Posts.js";
import { GET_STORIES, GET_STORY_MSG, GET_USER_STORIES } from "./Queries/Stories.js";
import { GET_USER, GET_ALL_USERS, GET_USER_INFO, USER_SUGGESTIONS, IF_USER_BLOCKED, GET_BLOCKED_USERS, COUNT_POSTS } from "./Queries/Users.js";
import { ChatMessagesType, MsgNotificationType } from "./TypeDefs/Chat.js";
import { CommunityChatMessagesType } from "./TypeDefs/Groups.js";
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
        get_user_info: GET_USER_INFO,
        get_user_suggestions: USER_SUGGESTIONS,
        if_user_blocked: IF_USER_BLOCKED,
        get_blocked_users: GET_BLOCKED_USERS,
        no_of_posts: COUNT_POSTS,
        // posts
        get_post: GET_POST,
        get_profile_posts: GET_PROFILE_POSTS,
        get_feed_posts: GET_FEED_POSTS,
        get_post_comments: GET_POST_COMMENTS,
        get_post_likes: GET_POST_LIKES,
        if_liked: IF_LIKED,
        random_posts: RANDOM_POSTS,
        // saved posts
        if_saved: IF_SAVED,
        get_saved_posts: GET_SAVED_POSTS,
        // chats
        chat_exists: CHAT_EXISTS,
        get_chats: GET_CHAT_LIST,
        get_all_user_chats: GET_ALL_USER_CHATS,
        get_messages: GET_MESSAGES,
        get_chat_media: GET_CHAT_MEDIA,
        last_message: LAST_MESSAGE,
        count_newMsgs: COUNT_ALL_MSGS,
        count_msgs: COUNT_MSGS,
        get_story_msg_url: GET_STORY_MSG,
        // group chat
        get_group_chats: GET_GROUP_CHATS,
        get_all_group_chats: GET_ALL_GROUP_CHATS,
        get_group_messages: GET_GROUP_MESSAGES,
        last_group_message: LAST_MESSAGE_GROUP,
        get_group_chat_members: GET_GROUP_CHAT_MEMBERS,
        get_group_chat_member: GET_GROUP_CHAT_MEMBER,
        // stories
        get_stories: GET_STORIES,
        get_user_stories: GET_USER_STORIES,
        // notifications
        get_notifications: GET_NOTIFICATIONS,
        //communities
        get_groups:GET_GROUPS,
        get_group: GET_GROUP,
        get_all_groups: GET_ALL_GROUPS,
        // community users
        get_group_members: GET_GROUP_MEMBERS,
        get_group_user: GET_GROUP_USER,
        if_requested: IF_REQUESTED,
        get_group_join_requests: GET_GROUP_JOIN_REQUESTS,
        //community posts
        get_group_posts: GET_GROUP_POSTS,
        get_group_post_comments: GET_GROUP_POST_COMMENTS,
        get_group_post_likes: GET_GROUP_POST_LIKES,
        get_saved_group_posts: GET_SAVED_GROUP_POSTS,
        if_group_post_saved: IF_GROUP_POST_SAVED,
        if_group_post_liked: IF_GROUP_POST_LIKED,
        get_group_reported_posts: GET_GROUP_REPORTED_POSTS,
        get_community_saved_posts: GET_COMMUNITY_SAVED_POSTS,
        // community messages
        get_community_messages: GET_COMMUNITY_MESSAGES
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
        change_password: CHANGE_PASSWORD,
        disable_account: DISABLE_ACCOUNT,
        undisable_account: UNDISABLE_ACCOUNT,
        delete_account: DELETE_ACCOUNT,
        edit_user_interests: EDIT_INTERESTS,
        edit_user_info: EDIT_USER_INFO,
        edit_bdate: EDIT_BDATE,
        edit_gender: EDIT_GENDER,
        block_user: BLOCK_USER,
        unblock_user: UNBLOCK_USER,
        set_last_seen: SET_LAST_SEEN,
        change_activity_status: CHANGE_ACTIVITY_STATUS,
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
        reply_to_story: REPLY_TO_STORY,
        seen: SEEN,
        // group chat
        create_group_chat:CREATE_GROUP_CHAT,
        delete_group_chat: DELETE_GROUP_CHAT,
        send_group_message: SEND_GROUP_MESSAGE,
        leave_group_chat_member: LEAVE_GROUP_CHAT_MEMBER,
        leave_group_chat_admin: LEAVE_GROUP_CHAT_ADMIN,
        delete_group_chat_message: DELETE_GROUP_CHAT_MESSAGE,
        add_group_chat_user: ADD_GROUP_CHAT_USER,
        remove_group_chat_member: REMOVE_GROUP_CHAT_MEMBER,
        // notifications
        like_notification: LIKE_NOTIFICATION,
        comment_notification: COMM_NOTIFICATION,
        follow_notification: FOLLOW_NOTIFICATION,
        clear_notifications: CLEAR_NOTIFICATIONS,
        remove_like_notif: REMOVE_LIKE_NOTIF,
        remove_follow_notif: REMOVE_FOLLOW_NOTIF,
        remove_comment_notif: REMOVE_COMMENT_NOTIF,
        // communities
        create_group: CREATE_GROUP,
        change_group_visibility: CHANGE_VISIBILITY,
        change_group_info: CHANGE_GROUP_INFO,
        change_group_banner: CHANGE_GROUP_BANNER_IMG,
        change_group_tags: CHANGE_GROUP_TAGS,
        change_group_name: CHANGE_GROUP_NAME,
        change_community_banner: CHANGE_COMMUNITY_BANNER,
        // community posts
        create_group_post: CREATE_GROUP_POST,
        delete_group_post: DELETE_GROUP_POST,
        like_group_post: LIKE_GP_POST,
        remove_group_post_like:REMOVE_GP_LIKE,
        comment_group_post: ADD_GP_COMMENT,
        remove_group_post_comment: REMOVE_GP_COMMENT,
        save_group_post: SAVE_GP,
        remove_saved_group_post: REMOVE_SAVED_GP,
        report_group_post: REPORT_GROUP_POST,
        allow_group_reported_post: ALLOW_REPORTED_POST,
        remove_group_reported_post: REMOVE_REPORTED_POST,
        // community users
        join_group: JOIN_GROUP,
        leave_group: LEAVE_GROUP,
        join_request: JOIN_REQUEST,
        remove_request: REMOVE_REQUEST,
        accept_join_request: ACCEPT_REQUEST,
        deny_join_request: DENY_REQUEST,
        remove_group_user: REMOVE_GROUP_USER,
        change_member_role: CHANGE_MEMBER_ROLE,
        // community chat
        send_community_message: SEND_COMMUNITY_MESSAGE
    }
})

const RootSubscription = new GraphQLObjectType({
    name:'RootSubscription',
    fields: {
        newMessage: {
            type: ChatMessagesType,
            subscribe: () => pubsub.asyncIterator(["NEW_MESSAGE"])
        },
        newGroupMessage: {
            type: ChatMessagesType,
            subscribe: () => pubsub.asyncIterator(["NEW_GROUP_MESSAGE"])
        },
        newMsgNotification: {
            type: MsgNotificationType,
            subscribe: () => pubsub.asyncIterator(["MSG_NOTIFICATION"])
        },
        newNotification: {
            type: NotificationType,
            subscribe: () => pubsub.asyncIterator(["NOTIFICATION"]) 
        },
        newCommunityMessage: {
            type: CommunityChatMessagesType,
            subscribe: () => pubsub.asyncIterator(["NEW_COMMUNITY_MESSAGE"]) 
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
})