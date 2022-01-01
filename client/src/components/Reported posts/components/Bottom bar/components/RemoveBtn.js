import React from 'react'
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const RemoveBtn = ({postID, reportID, refetch}) => {
    const [remove_post] = useMutation(REMOVE_POST)

    const handleRemovePost = () => {
        remove_post({
            variables:{
                reportID,
                postID
            }
        }).then(()=>refetch())
    }

    return (
        <div className='allow-remove-btn remove-btn' onClick={handleRemovePost}>
            <p>REMOVE</p>
        </div>
    )
}

export default RemoveBtn

const REMOVE_POST = gql`
    mutation($reportID: Int!, $postID: Int!){
        remove_group_reported_post(reportID: $reportID, postID: $postID){
            reportID
        }
    }
`