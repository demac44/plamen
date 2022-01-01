import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const CommChatBar = ({name, groupid}) => {
    return (
        <div className='comm-chat-bar flex-ac'>
            <Link to={'/community/'+groupid}>
                <FontAwesomeIcon icon='arrow-left' size='lg' color='white'/>
            </Link>
            <p>{name}</p>
        </div>
    )
}
export default CommChatBar