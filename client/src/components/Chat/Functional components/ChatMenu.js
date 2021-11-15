import React from 'react'


import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { useHistory } from 'react-router-dom'


const DELETE_CHAT = gql`
    mutation ($chatID:Int!){
        delete_chat(chatID: $chatID){
            chatID
        }
    }
`
 
const ChatMenu = ({chatid}) => {
    const history = useHistory()
    const [delete_chat] = useMutation(DELETE_CHAT)
 
    const handleChatDelete = () => {
        delete_chat({
            variables:{
                chatID: parseInt(chatid)
            }
        }).then(()=>window.location.href='/chats')
          
    }

    return (
        <div className='chat-menu'>
            <ul>
                <li 
                style={{color:'#940a00'}}
                onClick={handleChatDelete}
                >DELETE CHAT</li>
            </ul>
        </div>
    )
}

export default ChatMenu
