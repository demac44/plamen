import React from 'react'
import './style.css'
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
        <div className='req-btn req-btn-deny' onClick={handleDeny}>
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