import React from 'react'
import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const BlockUserBtn = ({userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [block_user] = useMutation(BLOCK_USER)

    const handleBlock = () => {
        block_user({
            variables:{
                blockerId: uid,
                blockedId: userID
            }
        }).then(()=>window.location.reload())
    }

    return (
        <div className='pf-block-user-btn' onClick={handleBlock}>
            <p>Block user</p>
        </div>
    )
}

export default BlockUserBtn

const BLOCK_USER = gql`
    mutation ($blockerId: Int!, $blockedId: Int!){
        block_user (blockerId:$blockerId, blockedId: $blockedId){
            blockedId
        }
    }
`