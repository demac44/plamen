import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const CommChatBar = ({name, groupid}) => {
    return (
        <div className='comm-chat-bar flex-h'>
            <Link to={'/community/'+groupid}>
                <FontAwesomeIcon icon='arrow-left' size='lg' color='white'/>
            </Link>
            <p style={styles.name}>{name}</p>
        </div>
    )
}

export default CommChatBar

const styles = {
    name:{
        fontSize:'18px',
        color:'white',
        marginLeft:'15px'
    }
}