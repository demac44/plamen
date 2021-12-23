import React, { useState } from 'react'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'

const DeleteChat = ({chatID, admin}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [delete_chat] = useMutation(DELETE_CHAT)

    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleChatDelete = () => {
        if(ls.userID===admin)
            delete_chat({
                variables:{
                    gcId: chatID
                }
            }).then(()=>window.location.href='/chats')
    }

    return (
        <>
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