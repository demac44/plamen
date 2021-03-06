import React from 'react'
import { Link } from 'react-router-dom'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo';
import Avatar from '../../../General components/Avatar'


const BlockedUserBox = ({user, refetch, uid}) => {
    const [unblock_user] = useMutation(UNBLOCK_USER)

    const handleUnblock = () => {
        unblock_user({
            variables:{
                blockerId: uid,
                blockedId: user.userID
            }
        }).then(()=>refetch())
    }


    return (
        <div className='users-list-user-box flex-sb'>
            <Link to={'/profile/'+user.username} className='flex-ctr'>
                <Avatar size='40px' image={user.profile_picture}/>
                <div className='users-list-names'>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <p>@{user.username}</p>
                </div>
            </Link>
            <button className='btn' onClick={handleUnblock}>UNBLOCK</button>
        </div>
    )
}

export default BlockedUserBox

const UNBLOCK_USER = gql`
    mutation ($blockerId: Int!, $blockedId: Int!){
        unblock_user(blockedId: $blockedId, blockerId: $blockerId){
            blockedId
        }
    }
`