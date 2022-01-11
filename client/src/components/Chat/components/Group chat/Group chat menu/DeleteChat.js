import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import './style.css'

const DeleteChat = ({chatID, admin}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [delete_chat] = useMutation(DELETE_CHAT)

    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleChatDelete = () => {
        if(uid===admin)
            delete_chat({
                variables:{
                    gcId: chatID
                }
            }).then(()=>window.location.href='/chats')
    }

    return (
        <>
            <li onClick={()=>setConfirmDelete(!confirmDelete)}>
                <p className='del-chat-btn'>DELETE CHAT</p>
            </li>

            {confirmDelete && <div className='flex-col-ctr del-chat-confirm-box'>
                <p>Are you sure you want to delete this chat?</p>
                <span className='flex-ctr' style={{marginTop:'10px'}}>
                    <button className='btn conf-box-btns' onClick={handleChatDelete}>CONFIRM</button>
                    <button className='btn conf-box-btns' onClick={()=>setConfirmDelete(false)}>EXIT</button>
                </span>
            </div>}
        </>
    )
}

export default DeleteChat

const DELETE_CHAT = gql`
    mutation ($gcId:Int!){
        delete_group_chat(groupChatId: $gcId){
            groupChatId
        }
    }
`