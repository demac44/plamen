import React, { useState } from 'react'

import { useSelector } from 'react-redux';
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'

import './style.css'

const LeaveChatBtn = ({data, admin, chatID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)

    const [delete_chat] = useMutation(DELETE_CHAT)
    const [leave_chat_member] = useMutation(LEAVE_CHAT_MEMBER)
    const [leave_chat_admin] = useMutation(LEAVE_CHAT_ADMIN)

    const [confirmLeave, setConfirmLeave] = useState(false)

    const handleChatDelete = () => {
        if(uid===admin)
            delete_chat({
                variables:{
                    gcId: chatID
                }
            }).then(()=>window.location.href='/chats')
    }

    const handleChatLeave = () => {
        if(data?.get_group_chat_members?.length<=1){
            handleChatDelete()
        } else {
            if (uid===admin){
                leave_chat_admin({
                    variables:{
                        gcId: chatID,
                        userID: uid
                    }
                }).then(()=>window.location.href = '/chats')
            } else {
                leave_chat_member({
                    variables:{
                        gcId: chatID,
                        userID: uid
                    }
                }).then(()=>window.location.href = '/chats')
            }
        }
    }

    return (
        <>
        <li
            onClick={()=>setConfirmLeave(!confirmLeave)}
            ><p className='del-chat-btn'>LEAVE CHAT</p>
        </li>

        {confirmLeave && <div className='flex-col-ctr del-chat-confirm-box'>
                            <p>Are you sure you want to leave this chat?</p>
                            <span className='flex-ctr' style={{marginTop:'10px'}}>
                                <button className='btn conf-box-btns' onClick={handleChatLeave}>CONFIRM</button>
                                <button className='btn conf-box-btns' onClick={()=>setConfirmLeave(false)}>EXIT</button>
                            </span>
                        </div>}
        </>
    )
}

export default LeaveChatBtn


const DELETE_CHAT = gql`
    mutation ($gcId:Int!){
        delete_group_chat(groupChatId: $gcId){
            groupChatId
        }
    }
`

const LEAVE_CHAT_MEMBER = gql`
    mutation ($userID: Int!, $gcId: Int!){
        leave_group_chat_member(userID: $userID, groupChatId: $gcId){
            groupChatId
        }
    }
`

const LEAVE_CHAT_ADMIN = gql`
    mutation($userID: Int!, $gcId: Int!){
        leave_group_chat_admin(userID: $userID, groupChatId: $gcId){
            groupChatId
        }
    }
`