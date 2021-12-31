import React, { useCallback, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';

import EmojisBox from '../../../General components/Emojis/EmojisBox'
import MsgPreviewBox from '../MsgPreviewBox'

import './style.css'


const SendGroupMsg = ({chatID, loaderCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [send_msg] = useMutation(SEND_MSG)
    // const [msg_notification] = useMutation(MSG_NOTIFICATION)
    const [media, setMedia] = useState(null)
    const [preview, setPreview] = useState(null)
    const [msgText, setMsgText] = useState('')
    const [emojis, setEmojis] = useState(false)

    useEffect(()=>{
        document.querySelector('.chat-messages').addEventListener('click', ()=>setEmojis(false))
        document.querySelector('.chat-bar').addEventListener('click', ()=>setEmojis(false))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        let msg_text = e.target.msg_text.value
        
        if(msg_text.trim().length < 1 && !media){
            return
        } else if (media) {
            loaderCallback(true)
            setPreview(false)
            const data = new FormData()
            data.append("file", media)
            data.append("upload_preset", "z8oybloj")
            data.append("folder", "Group messages media")
            axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${media.type.slice(0,5)}/upload`, data)
            .then(res => {
                send_msg({
                    variables: {
                        userID: uid,
                        username: usernm,
                        profile_picture: ls.profile_picture,
                        groupChatId: chatID, 
                        msg_text: msg_text,
                        type: media.type.slice(0,5),
                            url: res.data.url
                        }
                        }).then(()=>{
                            // msg_notification({
                                //     variables:{
                            //         sid: uid,
                            //         rid: uid,
                            //         groupChatId: chatID
                            //     }
                            // })
                            return
                        }).then(()=>{
                            setMedia(null)
                            e.target.msg_text.value = ''
                            loaderCallback(false)
                        })
                    })
                } else {
            send_msg({
                variables: {
                    userID: uid,
                    username: usernm,
                    profile_picture: ls.profile_picture,
                    groupChatId: chatID, 
                    msg_text: msg_text,
                    type:'text',
                    url: 'null'
                }
            }).then(()=>{
                // msg_notification({
                    //     variables:{
                        //         sid: uid,
                        //         rid: uid,
                        //         groupChatId: chatID
                        //     },
                        
                        // })
                        return
                    }).then(()=>{
                        e.target.msg_text.value = ''
                })
            }}
            
            const clearFiles = () => {
                setPreview(null)
                setMedia(null)
    }
    
    const emojiCB = useCallback(val => {
        setMsgText(msgText+val)
    }, [msgText])
    
    return (
        <>
            {(preview && media) && <MsgPreviewBox media={media} preview={preview} clearFiles={clearFiles}/>}
            {emojis && <EmojisBox emojiCB={emojiCB} visible={emojis}/>}
            <form className='msg-input-box flex-ctr' onSubmit={sendMessage}>
                <FontAwesomeIcon icon='icons' className='emojis-btn' onClick={()=>setEmojis(!emojis)}/>
                <div>
                    <label htmlFor='file-input'>
                        <FontAwesomeIcon icon='images' className='msg-upload-btn'/>
                    </label>
                    <input type='file' id='file-input' accept='video/*, image/*' style={{display:'none'}} 
                        onChange={(e)=>{
                            setMedia(e.target.files[0])
                            setPreview(e.target.value ? URL.createObjectURL(e.target.files[0]) : null)
                        }}></input>
                </div>
                <textarea 
                    name='msg_text' 
                    value={msgText} 
                    className='msg_text' 
                    onChange={(e)=>setMsgText(e.target.value)} 
                    placeholder='Send message...'
                    ></textarea>
                <button type='submit' className="post-button btn">SEND</button>
            </form>
        </>
    )
}

export default SendGroupMsg

const SEND_MSG = gql`
    mutation ($groupChatId: Int!, $userID: Int!, $msg_text: String!, $url: String, $type: String!, $username: String!){
        send_group_message (groupChatId: $groupChatId, userID: $userID, msg_text: $msg_text, url: $url, type: $type, username: $username){
            msgID
        }
    }
`

// const MSG_NOTIFICATION = gql`
//     mutation ($sid: Int!, $rid:Int!, $chatID: Int!){
//         msg_notification (sender_id: $sid, receiver_id: $rid, chatID: $chatID){ 
//             chatID
//         }
//     }
// `
