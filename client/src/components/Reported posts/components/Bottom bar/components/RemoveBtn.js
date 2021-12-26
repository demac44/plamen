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
        <div style={styles.btn} onClick={handleRemovePost}>
            <p>REMOVE</p>
        </div>
    )
}

export default RemoveBtn

const styles = {
    btn:{
        padding:'5px 20px',
        color:'white',
        backgroundColor:'#91211e',
        borderRadius:'10px',
        cursor:'pointer',
        margin:'5px'
    }
}

const REMOVE_POST = gql`
    mutation($reportID: Int!, $postID: Int!){
        remove_group_reported_post(reportID: $reportID, postID: $postID){
            reportID
        }
    }
`