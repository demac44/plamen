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
        const sql = `INSERT INTO reports (reportID, userPostedID, userReportedID, postID, reasons, date_reported)
                    VALUES (null, ${userPostedID}, ${userReportedID}, ${postID}, "${reasons}", null)`
        connection.query(sql)
        return args
    }
}
