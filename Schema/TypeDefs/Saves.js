import { 
    GraphQLObjectType,
    GraphQLInt,
 } from "graphql";


export const SavesType = new GraphQLObjectType({
    name: 'SavePost',
    fields: ()=>({
        postID: {type: GraphQLInt},
        userID: {type: GraphQLInt},
        limit: {type:GraphQLInt},
        offset: {type:GraphQLInt},
        groupID:{type: GraphQLInt}
    })
})
