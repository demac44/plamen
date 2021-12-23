import React, { useState } from 'react'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'

const LeaveChatBtn = ({data, admin, chatID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    const [delete_chat] = useMutation(DELETE_CHAT)
    const [leave_chat_member] = useMutation(LEAVE_CHAT_MEMBER)
    const [leave_chat_admin] = useMutation(LEAVE_CHAT_ADMIN)

    const [confirmLeave, setConfirmLeave] = useState(false)

    const handleChatDelete = () => {
        if(ls.userID===admin)
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
            if (ls.userID===admin){
                leave_chat_admin({
                    variables:{
                        gcId: chatID,
                        userID: ls.userID
                    }
                }).then(()=>window.location.href = '/chats')
            } else {
                leave_chat_member({
                    variables:{
                        gcId: chatID,
                        userID: ls.userID
                    }
                }).then(()=>window.location.href = '/chats')
            }
        }
    }

    return (
        <>
        <li
            style={{color:'#940a00'}}
            onClick={()=>setConfirmLeave(!confirmLeave)}
            >LEAVE CHAT
        </li>

        {confirmLeave && <div style={styles.confirmBox} className='flex-col-ctr'>
                            <p style={{color:'white'}}>Are you sure you want to leave this chat?</p>
                            <span className='flex-ctr' style={styles.btnsBox}>
                                <button style={styles.btns} className='btn' onClick={handleChatLeave}>CONFIRM</button>
                                <button style={styles.btns} className='btn' onClick={()=>setConfirmLeave(false)}>EXIT</button>
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

const styles = {
    confirmBox:{
        marginTop:'15px',
        padding:'10px',
        textAlign:'center',
    },
    btnsBox:{
        marginTop:'10px'
    },
    btns:{
        margin:'5px 10px',
        padding:'5px 10px'
    }
}