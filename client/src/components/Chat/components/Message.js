import React, { useState } from 'react'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'

const DELETE_MESSAGE = gql`
    mutation ($msgID: Int!){
        delete_message(msgID:$msgID){
            msgID
        }
    }
`


const Message = ({msg}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [deleteIcon, setDeleteIcon] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [delete_msg] = useMutation(DELETE_MESSAGE)

    const handleDelete = async () => {
        await delete_msg({
            variables:{msgID: msg.msgID}
        }).then(()=>setDeleted(true))
    }


    return (
        <div className={msg.userID===ls.userID ? 'msg-wrapper-cu' : 'msg-wrapper-ou'}
            onMouseOver={()=>setDeleteIcon(true)}
            onMouseLeave={()=>setDeleteIcon(false)}
            onClick={()=>setDeleteIcon(!deleteIcon)}
        >
            {(msg.userID===ls.userID && deleteIcon) && <i 
                className="fas fa-trash-alt"
                style={styles.deletebtn}
                onClick={handleDelete}
            ></i>}
            {msg.userID===ls.userID ?
            <div className='msg msg-current-user'>
                <p>{deleted ? 'This message is deleted!' :
                (msg.msg_text.slice(0,8)==='https://' ? 
                    <a href={msg.msg_text} target='_blank' style={styles.link} rel="noreferrer">{msg.msg_text}</a> : msg.msg_text)
            }</p>
            </div>
            : <div className='msg msg-other-user flex-ctr'>
                    <p>{msg.msg_text.slice(0,8)==='https://' ? 
                        <a href={msg.msg_text} target='_blank' rel="noreferrer">{msg.msg_text}</a> : msg.msg_text
                }</p>
            </div>}
        </div>
    )
}

export default Message


const styles = {
    deletebtn:{
        fontSize:'20px',
        cursor:'pointer',
        color:'#1f1f1f',
    },
    link:{
        color:'white',
        textDecoration:'underline'
    }
}