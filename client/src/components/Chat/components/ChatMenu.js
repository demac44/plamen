import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import AllChatMedia from './Chat media/AllChatMedia'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DELETE_CHAT = gql`
    mutation ($sender: String!, $receiver: String!){
        delete_chat(sender: $sender, receiver: $receiver){
            receiver
        }
    }
`
 
const ChatMenu = () => {
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [chatMedia, setChatMedia] = useState(false)
    const [delete_chat] = useMutation(DELETE_CHAT)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const {user} = useParams()


    const closeAllMediaCallback = useCallback(()=>{
        setChatMedia(false)
    }, [setChatMedia])
 
    const handleChatDelete = () => {
        delete_chat({
            variables:{
                sender: usernm,
                receiver: user
            }
        }).then(()=>window.location.href='/chats')
          
    }

    return (
        <>
            <div className='chat-menu'>
                <ul>
                    <li onClick={()=>setChatMedia(true)}>See media</li>

                    <li onClick={()=>setConfirmDelete(!confirmDelete)}>
                        <p className='del-chat-btn'>DELETE CHAT</p>
                    </li>

                    {confirmDelete && <div className='flex-col-ctr del-chat-confirm-box'>
                        <p>Are you sure you want to delete this chat?</p>
                        <span className='flex-ctr'>
                            <button className='btn conf-box-btns' onClick={handleChatDelete}>CONFIRM</button>
                            <button className='btn conf-box-btns' onClick={()=>setConfirmDelete(false)}>EXIT</button>
                        </span>
                    </div>}

                </ul>
            </div>
            {chatMedia && <AllChatMedia sender={user} receiver={usernm} closeAllMediaCallback={closeAllMediaCallback}/>}
        </>
    )
}

export default ChatMenu