import { 
    GraphQLObjectType,
    GraphQLSchema,
} from "graphql";


import { FOLLOW_USER, UNFOLLOW_USER } from "./Mutations/Followings.js";
import { LIKE_POST, REMOVE_LIKE } from "./Mutations/Likes.js";
import { CREATE_POST, DELETE_POST } from "./Mutations/Posts.js";
import { REMOVE_SAVED, SAVE_POST } from "./Mutations/Saves.js";
import { CREATE_USER } from "./Mutations/Users.js";
import { AUTH_USER } from "./Queries/Authenticate.js";
import { GET_FOLLOWERS, GET_FOLLOWING, IF_FOLLOWING } from "./Queries/Followings.js";
import { GET_LIKES, IF_LIKED } from "./Queries/Likes.js";
import { COUNT_POSTS, GET_FEED_POSTS, GET_POSTS } from "./Queries/Posts.js";
import { GET_SAVES, IF_SAVED } from "./Queries/Saves.js";
import { GET_USER, GET_ALL_USERS } from "./Queries/Users.js";

const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        user: GET_USER,
        users: GET_ALL_USERS,
        auth: AUTH_USER,
        posts: GET_POSTS,
        count_posts: COUNT_POSTS,
        ifFollowing: IF_FOLLOWING,
        getFollowers: GET_FOLLOWERS,
        getFollowing: GET_FOLLOWING,
        feed_posts: GET_FEED_POSTS,
        if_liked: IF_LIKED,
        get_likes: GET_LIKES,
        if_saved: IF_SAVED,
        get_saves: GET_SAVES
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
        remove_saved: REMOVE_SAVED
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})