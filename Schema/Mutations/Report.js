import { GraphQLInt, GraphQLString } from "graphql"
import connection from "../../middleware/db.js"
import { ReportType } from "../TypeDefs/Report.js"

export const POST_REPORT = {
    type:ReportType,
    args: {
        postID: {type: GraphQLInt},
        userPostedID: {type: GraphQLInt},
        userReportedID: {type: GraphQLInt},
        reasons:{type:GraphQLString}
    },
    resolve(_, args) {
        const {userPostedID, userReportedID, postID, reasons} = args
        connection.query(`
            INSERT INTO reports (userPostedID, userReportedID, postID, reasons)
            VALUES (${userPostedID}, ${userReportedID}, ${postID}, "${reasons}")
        `)
        return args
    }
}
