import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const AcceptBtn = ({userID, groupID, refetch}) => {
    const [accept_req] = useMutation(ACCEPT_REQUEST)

    const handleAccept = () => {
        accept_req({
            variables:{
                uid: userID,
                gid: groupID
            }
        }).then(()=>refetch())
    }

    return (
        <div style={styles.btn} onClick={handleAccept}>
            <p>ACCEPT</p>
        </div>
    )
}

export default AcceptBtn

const ACCEPT_REQUEST = gql`
    mutation ($uid: Int!, $gid: Int!){
        accept_join_request(userID: $uid, groupID: $gid){
            userID
        }
    }
`

const styles = {
    btn:{
        padding:'5px 10px',
        color:'white',
        backgroundColor:'#0f7743',
        borderRadius:'10px',
        cursor:'pointer',
        margin:'5px'
    }
}
