import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import AllChatMedia from './AllChatMedia'

const DELETE_CHAT = gql`
    mutation ($chatID:Int!){
        delete_chat(chatID: $chatID){
            chatID
        }
    }
`
 
const ChatMenu = ({chatid}) => {
    const [chatMedia, setChatMedia] = useState(false)
    const [delete_chat] = useMutation(DELETE_CHAT)


    const closeAllMediaCallback = useCallback(()=>{
        setChatMedia(false)
    }, [setChatMedia])
 
    const handleChatDelete = () => {
        delete_chat({
            variables:{
                chatID: parseInt(chatid)
            }
        }).then(()=>window.location.href='/chats')
          
    }

    return (
        <>
            <div className='chat-menu'>
                <ul>
                    <li onClick={()=>setChatMedia(true)}>See media</li>
                    <li 
                    style={{color:'#940a00'}}
                    onClick={handleChatDelete}
                    >DELETE CHAT</li>
                </ul>
            </div>
            {chatMedia && <AllChatMedia chatID={chatid} closeAllMediaCallback={closeAllMediaCallback}/>}
        </>
    )
}

export default ChatMenu
