import React, { useCallback, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import EmojisBox from '../../General components/Emojis/EmojisBox'
import MsgPreviewBox from './MsgPreviewBox'

const SEND_MSG = gql`
    mutation ($chatID: Int!, $userID: Int!, $msg_text: String!, $url: String, $type: String!){
        send_message (chatID: $chatID, userID: $userID, msg_text: $msg_text, url: $url, type: $type){
            msgID
        }
    }
`

const MSG_NOTIFICATION = gql`
    mutation ($sid: Int!, $rid:Int!, $chatID: Int!){
        msg_notification (sender_id: $sid, receiver_id: $rid, chatID: $chatID){ 
            chatID
        }
    }
`


const SendMsg = ({chatID, loaderCallback, info}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [send_msg] = useMutation(SEND_MSG)
    const [msg_notification] = useMutation(MSG_NOTIFICATION)
    const [media, setMedia] = useState(null)
    const [preview, setPreview] = useState(null)
    const [msgText, setMsgText] = useState('')
    const [emojis, setEmojis] = useState(false)
    const [lengthErr, setLengthErr] = useState(false)

    useEffect(()=>{
        document.querySelector('.chat-messages').addEventListener('click', ()=>setEmojis(false))
        document.querySelector('.chat-bar').addEventListener('click', ()=>setEmojis(false))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        setEmojis(false)
        if(msgText.trim().length < 1 && !media){
            return
        } else if (msgText.length > 5000){
            setLengthErr(true)
            return
        } else if (media) {
            loaderCallback(true)
            setPreview(false)
            const data = new FormData()
            data.append("file", media)
            data.append("upload_preset", "z8oybloj")
            data.append("folder", "Messages media")
            axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${media.type.slice(0,5)}/upload`, data)
            .then(res => {
                    send_msg({
                        variables: {
                            userID: ls.userID,
                            username: ls.username,
                            profile_picture: ls.profile_picture,
                            chatID: chatID, 
                            msg_text: msgText,
                            type: media.type.slice(0,5),
                            url: res.data.url
                        }
                        }).then(()=>{
                            msg_notification({
                                variables:{
                                    sid: ls.userID,
                                    rid: info.userID,
                                    chatID: chatID
                                }
                            })
                        }).then(()=>{
                            setMedia(null)
                            loaderCallback(false)
                            setMsgText('')
                        })
            })
        } else {
            send_msg({
                variables: {
                    userID: ls.userID,
                    username: ls.username,
                    profile_picture: ls.profile_picture,
                    chatID: chatID, 
                    msg_text: msgText,
                    type:'text',
                    url: 'null'
                }
                }).then(()=>{
                    msg_notification({
                        variables:{
                            sid: ls.userID,
                            rid: info.userID,
                            chatID: chatID
                        },
                        
                    })
                }).then(()=>{
                    setMsgText('')
                })
    }}

    const clearFiles = () => {
        setPreview(null)
        setMedia(null)
    }

    const emojiCB = useCallback(val => {
        setMsgText(msgText+val)
    })

    return (
        <>
            {(preview && media) && <MsgPreviewBox media={media} preview={preview} clearFiles={clearFiles}/>}
            <EmojisBox emojiCB={emojiCB} visible={emojis}/>
            <form className='msg-input-box flex-ctr' onSubmit={sendMessage}>
                <FontAwesomeIcon icon='icons' style={styles.iconsIcon} onClick={()=>setEmojis(!emojis)}/>
                <div>
                    <label htmlFor='file-input'>
                        <FontAwesomeIcon icon='images' style={styles.imgIcon}/>
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

export default SendMsg


const styles = {
    imgIcon: { 
        fontSize:'30px',
        color:'white',
        cursor:'pointer',
        marginRight:'10px'
    },
    iconsIcon: { 
        fontSize:'25px',
        color:'white',
        cursor:'pointer',
        marginRight:'15px'
    },
    imgPreviewBar:{
        width:'100%',
        height:'100px',
        backgroundColor: '#1f1f1f',
        position:'absolute',
        bottom:'50px',
        zIndex:'10000000000000000000000000000',
        padding:'5px',
        display:'flex'
    },
    previewMedia:{
        height:'100%',
        maxWidth:'100%'
    },
    clear: {
        width:'30px',
        height:'100%',
        backgroundColor:'#4f4f4f',
        fontSize:'20px',
        color:'white',
        cursor:'pointer'
    }
}