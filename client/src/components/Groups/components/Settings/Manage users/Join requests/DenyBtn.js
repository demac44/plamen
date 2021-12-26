import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const DenyBtn = ({userID, groupID, refetch}) => {
    const [deny_request] = useMutation(DENY_REQUEST)

    const handleDeny = () => {
        deny_request({
            variables:{
                uid: userID,
                gid: groupID
            }
        }).then(()=>refetch())
    }

    return (
        <div style={styles.btn} onClick={handleDeny}>
            <p>DENY</p>
        </div>
    )
}

export default DenyBtn

const DENY_REQUEST = gql`
    mutation($uid: Int!, $gid: Int!){
        deny_join_request(userID: $uid, groupID: $gid){
            userID
        }
    }
`


const styles = {
    btn:{
        padding:'5px 10px',
        color:'white',
        backgroundColor:'#91211e',
        borderRadius:'10px',
        cursor:'pointer',
        margin:'5px'
    }
}