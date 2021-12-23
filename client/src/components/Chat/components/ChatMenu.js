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

                    <li style={{color:'#940a00'}} onClick={()=>setConfirmDelete(!confirmDelete)}>
                        <p>DELETE CHAT</p>
                    </li>

                    {confirmDelete && <div style={styles.confirmBox} className='flex-col-ctr'>
                        <p style={{color:'white'}}>Are you sure you want to delete this chat?</p>
                        <span className='flex-ctr' style={styles.btnsBox}>
                            <button style={styles.btns} className='btn' onClick={handleChatDelete}>CONFIRM</button>
                            <button style={styles.btns} className='btn' onClick={()=>setConfirmDelete(false)}>EXIT</button>
                        </span>
                    </div>}

                </ul>
            </div>
            {chatMedia && <AllChatMedia chatID={chatID} closeAllMediaCallback={closeAllMediaCallback}/>}
        </>
    )
}

export default ChatMenu

const styles = {
    confirmBox:{
        marginTop:'15px',
        padding:'10px',
        textAlign:'center'
    },
    btnsBox:{
        marginTop:'10px'
    },
    btns:{
        margin:'5px 10px',
        padding:'5px 10px'
    }
}