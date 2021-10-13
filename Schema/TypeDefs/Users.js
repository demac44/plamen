import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
 } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        user_id: {type: GraphQLInt},
        tag_name: {type: GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        email:{type:GraphQLString},
        pass:{type:GraphQLString},
        birth_date: {type: GraphQLString},
        date_registered: {type: GraphQLString},
        pfp_url: {type: GraphQLString}
    })
})