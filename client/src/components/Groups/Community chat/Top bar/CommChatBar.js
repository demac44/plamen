import React from 'react'
import { Link } from 'react-router-dom'

const CommChatBar = ({name, groupid}) => {
    return (
        <div className='comm-chat-bar flex-ac'>
            <Link to={'/community/'+groupid}>
                <i className='fas fa-arrow-left' style={{color:'white', fontSize:'20px'}}/>
            </Link>
            <p>{name}</p>
        </div>
    )
}
export default CommChatBar