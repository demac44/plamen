import React, { useCallback, useEffect, useState } from 'react'

import { gql } from 'graphql-tag'
import { useMutation } from 'react-apollo'
import OpenMedia from './OpenMedia'

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
    const [time, setTime] = useState(null)
    const [delete_msg] = useMutation(DELETE_MESSAGE, {
        variables:{msgID: msg.msgID}
    })
    
    useEffect(()=>{
        const getTime = () => {
            let utcSeconds = msg.time_sent;
            utcSeconds = new Date(utcSeconds).getTime()
            let d = Date.now() - utcSeconds
            d = Math.floor((d/1000)/60)
            if(d===0) setTime('Now')
            else if(d<60) setTime(d+'m ago')
            else if(d>60 && d<60*24) setTime(Math.floor(d/60)+'h ago')
            else if(d>60*24 && d<60*24*30) setTime(Math.floor(d/(60*24))+'d ago')
            else if(d>60*24*30) {
                let d = new Date(utcSeconds)
                setTime(d.toDateString())
            }
        }
        getTime()
    }, [msg])

    const handleDelete = () => {
        delete_msg().then(()=>{setDeleted(true)})
    }  

    const closeMediaCallback = useCallback(val => {
        setOpenMedia(val)
    }, [setOpenMedia])
    
    return (
        <>
            <div className={msg.userID===ls.userID ? 'msg-wrapper-cu' : 'msg-wrapper-ou'}
                    onMouseOver={()=>setMsgOptions(true)}
                    onMouseLeave={()=>setMsgOptions(false)}
                    onClick={()=>setMsgOptions(!msgOptions)}>

                {(msg.userID===ls.userID && msgOptions && !deleted) && 
                    <>
                        <p style={styles.timeCU}>{time}</p>
                        <i 
                            className="fas fa-trash-alt"
                            style={styles.deletebtn}
                            onClick={handleDelete}
                        ></i>
                    </>
                    }

                {msg.userID===ls.userID ?
                <div className='msg msg-current-user' style={{backgroundColor: deleted && 'gray'}}>
                    {deleted ? 'This message is deleted!' :
                    <>
                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url}/>}
                        {msg.type==='video' && <video className='message-video' src={msg.url} controls/>}
                        <p>{msg.msg_text.slice(0,8)==='https://' ? 
                            <a href={msg.msg_text} target='_blank' style={styles.link} rel="noreferrer">{msg.msg_text}</a> : msg.msg_text}</p>  
                    </>}
                </div>
                : <div className='msg msg-other-user'>
                        {msg.type==='image' && <img className='message-image' onClick={()=>setOpenMedia(true)} src={msg.url}/>}
                        {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>}
                        <p>{msg.msg_text.slice(0,8)==='https://' ? 
                            <a href={msg.msg_text} target='_blank' rel="noreferrer">{msg.msg_text}</a> : msg.msg_text
                    }</p>
                </div>}
                {(msg.userID!==ls.userID && msgOptions && !deleted) && <p style={styles.timeOU}>{time}</p>}
            </div>
            {openMedia && <OpenMedia url={msg.url} callback={closeMediaCallback}/>}    
        </>
    )
}

export default Message


const styles = {
    deletebtn:{
        fontSize:'20px',
        cursor:'pointer',
        color:'#1f1f1f',
        marginTop:'10px'
    },
    link:{
        color:'white',
        textDecoration:'underline'
    },
    timeCU:{
        fontSize:'14px',
        marginRight:'30px',
        marginTop:'7px'
    },
    timeOU:{
        fontSize:'14px',
        marginLeft:'30px',
        marginTop:'7px'
    }
}