import React from 'react'
import { useSelector } from 'react-redux';
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

const UnblockUserBtn = ({blockedId}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [unblock_user] = useMutation(UNBLOCK_USER)

    const handleUnblock = () => {
        unblock_user({
            variables:{
                blockerId: uid,
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