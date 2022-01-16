import React, { useCallback, useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import axios from 'axios'
import { useSelector } from 'react-redux';
import EmojisBox from '../../../General components/Emojis/EmojisBox'
import MsgPreviewBox from './MsgPreviewBox'
import { useParams } from 'react-router-dom';


const SendMsg = ({loaderCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [send_msg] = useMutation(SEND_MSG)
    const [msg_notification] = useMutation(MSG_NOTIFICATION)
    const [media, setMedia] = useState(null)
    const [preview, setPreview] = useState(null)
    const [msgText, setMsgText] = useState('')
    const [emojis, setEmojis] = useState(false)
    const [lengthErr, setLengthErr] = useState(false)
    const {user} = useParams()
    
    useEffect(()=>{
        document.querySelector('.chat-messages').addEventListener('click', ()=>setEmojis(false))
        document.querySelector('.chat-bar').addEventListener('click', ()=>setEmojis(false))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        setEmojis(false)
        if(msgText.trim().length < 1 && !media){
            return
        } else if (msgText.length > 6000){
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
                            sender: usernm,
                            receiver: user,
                            profile_picture: ls.profile_picture,
                            msg_text: msgText,
                            type: media.type.slice(0,5),
                            url: res.data.url
                        }
                    }).then(()=>{
                        msg_notification({
                            variables:{
                                sender: usernm,
                                receiver:user
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
                            sender: usernm,
                            receiver: user,
                            profile_picture: ls.profile_picture,
                            msg_text: msgText,
                            type:'text',
                            url: 'null'
                        }
                    
                    }).then(()=>{
                        msg_notification({
                            variables:{
                                sender: usernm,
                                receiver:user
                            }
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
    }, [msgText])
    
    return (
        <>
            {(preview && media) && <MsgPreviewBox media={media} preview={preview} clearFiles={clearFiles}/>}

            <EmojisBox emojiCB={emojiCB} visible={emojis}/>

            <form className='msg-input-box flex-ctr' onSubmit={sendMessage}>
                {lengthErr && <p className='msg-length-err'>Message too long! Max. characters allowed: 6000</p>}

                <i className='fas fa-icons emojis-btn' onClick={()=>setEmojis(!emojis)}/>

                <div> 
                    <label htmlFor='file-input'>
                        <i className='fas fa-images msg-upload-btn'/>
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

const SEND_MSG = gql`
    mutation ($sender: String!, $receiver: String!, $msg_text: String!, $url: String, $type: String!){
        send_message (sender: $sender, receiver: $receiver, msg_text: $msg_text, url: $url, type: $type){
            msgID
        }
    }
`

const MSG_NOTIFICATION = gql`
    mutation ($sender: String!, $receiver: String!){
        msg_notification (sender: $sender, receiver: $receiver){ 
            receiver
        }
    }
`