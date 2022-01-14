import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import AllChatMedia from './Chat media/AllChatMedia'

const DELETE_CHAT = gql`
    mutation ($chatID:Int!){
        delete_chat(chatID: $chatID){
            chatID
        }
    }
`
 
const ChatMenu = ({chatID}) => {
    const [chatMedia, setChatMedia] = useState(false)
    const [delete_chat] = useMutation(DELETE_CHAT)
    const [confirmDelete, setConfirmDelete] = useState(false)


    const closeAllMediaCallback = useCallback(()=>{
        setChatMedia(false)
    }, [setChatMedia])
 
    const handleChatDelete = () => {
        delete_chat({
            variables:{
                chatID: chatID
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
            {chatMedia && <AllChatMedia chatID={chatID} closeAllMediaCallback={closeAllMediaCallback}/>}
        </>
    )
}

export default ChatMenu