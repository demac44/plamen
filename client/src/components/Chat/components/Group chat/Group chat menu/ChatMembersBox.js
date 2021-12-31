import React from 'react'
import { useSelector } from 'react-redux';
import UserBox from '../../../../General components/Users list/UserBox'
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './style.css'

const ChatMembersBox = ({data, admin, refetch, chatID, adminMember}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [remove_member] = useMutation(REMOVE_MEMBER)

    const handleRemoveMember = (userID) => {
        if(uid===admin){
            remove_member({
                variables:{
                    gcId: chatID,
                    userID: uid
                }
            }).then(()=>refetch())
        }
    }

    return (
        <span className='flex-col-ctr box gc-members-box'>
            <p>Chat members</p>

            {adminMember?.userID && <span className='flex-ac wh-100'>
                <UserBox user={adminMember}/>
                <p className='gc-admin-tag'>ADMIN</p>
            </span>}

            {data?.get_group_chat_members?.map(member => (
                member?.userID!==admin &&
                <div className='flex-ac wh-100' key={member.userID}>
                    <UserBox user={member}/>

                    {(uid===admin) && 
                        <FontAwesomeIcon 
                            icon='times' 
                            className='gc-removeu-btn'
                            onClick={()=>handleRemoveMember(member.userID)}
                    />}

                </div>
            ))}
        </span>
    )
}

export default ChatMembersBox


const REMOVE_MEMBER = gql`
    mutation ($userID: Int!, $gcId: Int!){
        remove_group_chat_member(userID: $userID, groupChatId: $gcId){
            userID
        }
    }
`