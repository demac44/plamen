import React, { useCallback, useState, memo } from 'react'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import OpenMedia from './OpenMedia'
import SetTime from '../../General components/SetTime'
import Avatar from '../../General components/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DELETE_MESSAGE = gql`
    mutation ($msgID: Int!){
        delete_message(msgID:$msgID){
            msgID
        }
    }
`


const Message = ({msg}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [msgOptions, setMsgOptions] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [openMedia, setOpenMedia] = useState(false)
    const [delete_msg] = useMutation(DELETE_MESSAGE, {
        variables:{msgID: msg.msgID}
    })

    const handleDelete = () => {
        delete_msg().then(()=>{setDeleted(true)})
    }  

    const closeMediaCallback = useCallback(val => {
        setOpenMedia(val)
    }, [setOpenMedia])
    
    return (
        <>
            <div className={msg.userID===ls.userID ? 'msg-wrapper-cu flex-h' : 'msg-wrapper-ou flex-h'}
                    onMouseOver={()=>setMsgOptions(true)}
                    onMouseLeave={()=>setMsgOptions(false)}
                    onClick={()=>setMsgOptions(!msgOptions)}>

                {(msg.userID===ls.userID && msgOptions && !deleted) && 
                    <>
                        <FontAwesomeIcon
                            icon='trash-alt' 
                            style={styles.deletebtn}
                            onClick={handleDelete}
                        />
                    </>
                    }
                {msg?.userID!==ls.userID && <Avatar size='35px' image={msg?.profile_picture}/>}
                {msg.userID===ls.userID ?
                <div className='msg msg-current-user' style={{backgroundColor: deleted && 'gray'}}>
                    {deleted ? 'This message is deleted!' :
                    <>
                        {/* media message */}
                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                        {msg.type==='video' && <video className='message-video' src={msg.url} controls/>}
                            
                        <p>{msg.msg_text.slice(0,8)==='https://' ? 
                            <a href={msg.msg_text} target='_blank' style={styles.link} rel="noreferrer">{msg.msg_text}</a> : msg.msg_text}</p>  

                        <span style={{...styles.timestamp, textAlign:'right'}}>
                            <SetTime timestamp={msg.time_sent} fontSize='12px'/>
                        </span>
                    </>}
                </div>
                : <div className='msg msg-other-user'>

                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url} alt=''/>}
                        {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>}

                        {msg.msg_text.slice(0,8)==='https://' ? 
                            <a href={msg.msg_text} target='_blank' rel="noreferrer">{msg.msg_text}</a> : 
                            <p><strong>{msg?.username+' '}</strong>{msg.msg_text}</p>
                        }      
                        
                        <span><SetTime timestamp={msg.time_sent} fontSize='12px'/></span>
                </div>}
            </div>
            {openMedia && <OpenMedia url={msg.url} callback={closeMediaCallback}/>}    
        </>
    )
}

export default memo(Message)


const styles = {
    deletebtn:{
        fontSize:'20px',
        cursor:'pointer',
        color:'#aaa',
        marginTop:'10px',
        marginRight:'10px'
    },
    link:{
        color:'white',
        textDecoration:'underline'
    },
    timestamp:{
        width:'100%'
    }
}