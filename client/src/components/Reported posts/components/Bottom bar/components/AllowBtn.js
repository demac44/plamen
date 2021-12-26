import React from 'react'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const AllowBtn = ({reportID, refetch}) => {
    const [allow_post] = useMutation(ALLOW_POST)

    const handleAllowPost = () => {
        allow_post({
            variables:{
                reportID: reportID
            }
        }).then(()=>refetch())
    }

    return (
        <div style={styles.btn} onClick={handleAllowPost}>
            <p>ALLOW</p>
        </div>
    )
}

export default AllowBtn

const styles = {
    btn:{
        padding:'5px 20px',
        color:'white',
        backgroundColor:'#0f7743',
        borderRadius:'10px',
        cursor:'pointer',
        margin:'5px'
    }
}

const ALLOW_POST = gql`
    mutation($reportID: Int!){
        allow_group_reported_post(reportID: $reportID){
            reportID
        }
    }
`