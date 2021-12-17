import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChatsOptions = () => {
    return (
        <div className='chats-options flex-h'>
            <span style={styles.newChat} className='flex-ctr'>
                <FontAwesomeIcon icon='plus'/>
            </span>
            <FontAwesomeIcon icon='ellipsis-v' style={styles.opt}/>
        </div>
    )
}

export default ChatsOptions

const styles = {
    newChat:{
        fontSize:'30px',
        color:'white',
        backgroundColor:'#2f2f2f',
        marginRight:'15px',
        width:'50px',
        height:'50px',
        borderRadius:'50%',
        cursor:'pointer'
    },
    opt:{
        fontSize:'30px',
        color:'white',
    }
}