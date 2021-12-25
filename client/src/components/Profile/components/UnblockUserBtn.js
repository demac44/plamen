import React from 'react'

import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

const UnblockUserBtn = ({blockedId}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [unblock_user] = useMutation(UNBLOCK_USER)

    const handleUnblock = () => {
        unblock_user({
            variables:{
                blockerId: ls.userID,
                blockedId: blockedId
            }
        }).then(()=>window.location.reload())
    }

    return (
        <div className='profile-top-box-buttons btn' onClick={handleUnblock}>
            <p>UNBLOCK</p>
        </div>
    )
}

export default UnblockUserBtn

const UNBLOCK_USER = gql`
    mutation ($blockerId: Int!, $blockedId: Int!){
        unblock_user(blockedId: $blockedId, blockerId: $blockerId){
            blockedId
        }
    }
`