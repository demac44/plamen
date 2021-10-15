import { 
    GraphQLObjectType,
    GraphQLSchema,
} from "graphql";

import { CREATE_USER } from "./Mutations/Users.js";
import { AUTH_USER } from "./Queries/Authenticate.js";
import { GET_USER, GET_ALL_USERS } from "./Queries/Users.js";

const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        user: GET_USER,
        users: GET_ALL_USERS,
        auth: AUTH_USER
    }
})    

const RootMutation = new GraphQLObjectType({
    name:'RootMutation',
    fields: {
        new_user: CREATE_USER
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})