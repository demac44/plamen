import React, { useCallback, useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import '../../../Chat/Chat.css'
import MsgPreviewBox from '../../../Chat/components/Messages/MsgPreviewBox'
import EmojisBox from '../../../General components/Emojis/EmojisBox'



const CommSendMsg = ({groupID, loaderCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const uid = useSelector(state => state.isAuth.user?.userID)
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    const [send_msg] = useMutation(SEND_MSG)
    const [media, setMedia] = useState(null)
    const [preview, setPreview] = useState(null)
    const [msgText, setMsgText] = useState('')
    const [emojis, setEmojis] = useState(false)
    const [lengthErr, setLengthErr] = useState(false)
    
    useEffect(()=>{
        // document.querySelector('.chat-messages').addEventListener('click', ()=>setEmojis(false))
        // document.querySelector('.chat-bar').addEventListener('click', ()=>setEmojis(false))
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
            data.append("folder", "Community messages media")
            axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${media.type.slice(0,5)}/upload`, data)
            .then(res => {
                    send_msg({
                        variables: {
                            userID: uid,
                            username: usernm,
                            pfp: ls.profile_picture || '',
                            groupID, 
                            msg_text: msgText,
                            type: media.type.slice(0,5),
                            url: res.data.url
                        }
                    }).then(()=>{
                            setMedia(null)
                            loaderCallback(false)
                            setMsgText('')
                        })
                    })
                } else {
                    send_msg({
                        variables: {
                            userID: uid,
                            username: usernm,
                            pfp: ls.profile_picture || '',
                            groupID, 
                            msg_text: msgText,
                            type:'text',
                            url: 'null'
                        }
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

            {emojis && <EmojisBox emojiCB={emojiCB} visible={true}/>}

            <form className='comm-msg-input-box flex-sb' onSubmit={sendMessage}>
                {lengthErr && <p className='msg-length-err'>Message too long! Max. characters allowed: 6000</p>}
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
                    className='comm_msg_text' 
                    onChange={(e)=>setMsgText(e.target.value)} 
                    placeholder='Send message...'
                    ></textarea>
                <button type='submit' className="post-button btn">SEND</button>
            </form>
        </>
    )
}

export default CommSendMsg

const SEND_MSG = gql`
    mutation ($groupID: Int!, $userID: Int!, $msg_text: String!, $url: String, $type: String!, $username: String!, $pfp: String!){
        send_community_message (groupID: $groupID, userID: $userID, msg_text: $msg_text, 
                                url: $url, type: $type, username: $username, profile_picture: $pfp){
            msgID
        }
    }
`