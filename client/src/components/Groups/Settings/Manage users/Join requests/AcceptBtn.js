import React from 'react'
import './style.css'
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
        <div className='req-btn req-btn-accept' onClick={handleAccept}>
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