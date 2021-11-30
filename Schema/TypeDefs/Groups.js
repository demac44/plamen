import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
 } from "graphql";


export const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: ()=>({
        groupID: {type: GraphQLInt},
        group_name: {type: GraphQLString},
        group_creator_id: {type: GraphQLInt},
        date_created: {type:GraphQLString},
        closed: {type:GraphQLBoolean},
        group_description: {type:GraphQLString},
        group_rules: {type:GraphQLString},
        group_tags: {type:GraphQLString}
    })
})
