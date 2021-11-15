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
    const [deletei, setDelete] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [delete_msg] = useMutation(DELETE_MESSAGE)

    const handleDelete = () => {
        delete_msg({
            variables:{msgID: msg.msgID}
        }).then(()=>setDeleted(true))
    }


    return (
        <div className={msg.userID===ls.userID ? 'msg-wrapper-cu' : 'msg-wrapper-ou'}
            onMouseOver={()=>setDelete(true)}
            onMouseLeave={()=>setDelete(false)}
        >
            {(msg.userID===ls.userID && deletei) && <i 
                className="fas fa-trash-alt"
                style={styles.deletebtn}
                onClick={handleDelete}
            ></i>}
            {msg.userID===ls.userID ?
            <p className='msg msg-current-user flex-ctr'>{deleted ? 'This message is deleted!' : msg.msg_text}</p>
            : <p className='msg msg-other-user flex-ctr'>{msg.msg_text}</p>}
        </div>
    )
}

export default Message


const styles = {
    deletebtn:{
        fontSize:'20px',
        cursor:'pointer',
        color:'#1f1f1f',
        marginTop:'10px'
    }
}