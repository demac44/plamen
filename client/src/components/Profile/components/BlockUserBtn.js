import React from 'react'

import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

const BlockUserBtn = ({userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [block_user] = useMutation(BLOCK_USER)

    const handleBlock = () => {
        block_user({
            variables:{
                blockerId: ls.userID,
                blockedId: userID
            }
        }).then(()=>window.location.reload())
    }

    return (
        <div style={styles.blockBtn} onClick={handleBlock}>
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

const styles = {
    blockBtn:{
        position:'absolute',
        top:'10px',
        right:'40px',
        color:'white',
        padding:'5px 20px',
        border:'1px solid #2f2f2f',
        borderRadius:'10px',
        cursor:'pointer'
    }
}