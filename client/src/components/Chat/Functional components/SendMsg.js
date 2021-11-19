import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import axios from 'axios'

const SEND_MSG = gql`
    mutation ($chatID: Int!, $userID: Int!, $msg_text: String!, $url: String, $type: String!){
        send_message (chatID: $chatID, userID: $userID, msg_text: $msg_text, url: $url, type: $type){
            msgID
        }
    }
`


const SendMsg = ({chatid, loaderCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [send_msg] = useMutation(SEND_MSG)
    const [media, setMedia] = useState(null)
    const [preview, setPreview] = useState(null)

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
            data.append("folder", "Messages media")
            axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${media.type.slice(0,5)}/upload`, data)
            .then(res => {
                    send_msg({
                        variables: {
                            userID: ls.userID,
                            chatID: parseInt(chatid), 
                            msg_text: msg_text,
                            type: media.type.slice(0,5),
                            url: res.data.url
                        }
                }).then(()=>{
                    setMedia(null)
                    e.target.msg_text.value = ''
                    loaderCallback(false)
                }
                )
            })
        } else {
            send_msg({
                variables: {
                    userID: ls.userID,
                    chatID: parseInt(chatid), 
                    msg_text: msg_text,
                    type:'text',
                    url: 'null'
                }
        }).then(()=>{
            e.target.msg_text.value = ''
        })
    }}

    const clearFiles = () => {
        setPreview(null)
        setMedia(null)
    }

    return (
        <>
            {(preview && media) && 
                <div style={styles.imgPreviewBar}>

                    {media.type.slice(0,5)==='image' &&
                    <img style={styles.previewMedia} src={preview} 
                        onLoad={()=>URL.revokeObjectURL(preview)}/>}

                    {media.type.slice(0,5)==='video' &&
                        <video style={styles.previewMedia} src={preview}
                        onLoad={()=>URL.revokeObjectURL(preview)}></video>}
                    <div style={styles.clear} onClick={clearFiles} className='flex-ctr'><i className='fas fa-times'></i></div>
                </div>}
            <form className='msg-input-box flex-ctr' onSubmit={sendMessage}>

                <div>
                    <label htmlFor='file-input'>
                        <i className='fas fa-image' style={styles.imgIcon}></i>
                    </label>
                    <input type='file' id='file-input' accept='video/*, image/*' style={{display:'none'}} 
                        onChange={(e)=>{
                            setMedia(e.target.files[0])
                            setPreview(e.target.value ? URL.createObjectURL(e.target.files[0]) : null)
                    }}></input>
                </div>
                <textarea name='msg_text' placeholder='Send message...'></textarea>
                <button type='submit' className="fp-cmt-btn">SEND</button>
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
    imgPreviewBar:{
        width:'100%',
        height:'100px',
        backgroundColor: '#111827',
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