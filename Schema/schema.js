import { 
    GraphQLObjectType,
    GraphQLSchema,
} from "graphql";
import { CREATE_TEXT_POST, DELETE_POST } from "./Mutations/Posts.js";

import { CREATE_USER } from "./Mutations/Users.js";
import { AUTH_USER } from "./Queries/Authenticate.js";
import { COUNT_POSTS, GET_POSTS } from "./Queries/Posts.js";
import { GET_USER, GET_ALL_USERS } from "./Queries/Users.js";

const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        user: GET_USER,
        users: GET_ALL_USERS,
        auth: AUTH_USER,
        posts: GET_POSTS,
        count_posts: COUNT_POSTS
    }
})    

const RootMutation = new GraphQLObjectType({
    name:'RootMutation',
    fields: {
        new_user: CREATE_USER,
        new_textPost: CREATE_TEXT_POST,
        delete_post: DELETE_POST
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})