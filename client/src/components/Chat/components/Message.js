import React from 'react'

const Message = ({msg}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    return (
        <div className={msg.userID===ls.userID ? 'msg-wrapper-cu' : 'msg-wrapper-ou'}>
            {msg.userID===ls.userID ?
            <p className='msg msg-current-user flex-ctr'>{msg.msg_text}</p>
            : <p className='msg msg-other-user flex-ctr'>{msg.msg_text}</p>}
        </div>
    )
}

export default Message
