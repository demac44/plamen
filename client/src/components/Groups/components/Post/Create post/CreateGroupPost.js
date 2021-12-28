import React, { useCallback, useState } from 'react'
import axios from 'axios'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { useSelector } from 'react-redux';

import VideoPreview from './components/VideoPreview'
import ImagePreview from './components/ImagePreview'
import UploadImage from './components/UploadImage'
import UploadVideo from './components/UploadVideo'
import EmojisBox from '../../../../General components/Emojis/EmojisBox'

const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!, $url: String!, $type: String!, $groupID: Int!){
        create_group_post(userID: $userID, post_text: $text, url: $url, type: $type, groupID: $groupID){
            userID
        }
    }
`

const CreatePost = ({refetch, groupid}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null)
    const [emptyErr, setEmptyErr] = useState('')
    const [sizeError, setSizeError] = useState(false)
    const [lengthErr, setLengthErr] = useState(false)
    const [postText, setPostText] = useState('')

    const [new_post] = useMutation(NEW_POST)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(postText.trim().length < 1 && !image && !video){
            setEmptyErr('2px solid #E82c30')
            return
        } else if (postText.length > 5000) {
            setLengthErr(true)
        return
        } else {
            if (image){
                setLoading(true)  
                const data = new FormData()
                data.append("file", image)
                data.append("upload_preset", "z8oybloj")
                data.append("folder", "Group posts")
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: uid,
                            text: postText,
                            url: res.data.url,
                            type:'image',
                            groupID: parseInt(groupid)
                        }
                    }).then(()=>{
                        setVideo(null)
                        setImage(null )
                        setLoading(false)
                        setPreview(null)
                        refetch()
                        e.target.text.value = ''
                    }
                    )
                })
            } else if (video) {
                setLoading(true) 
                const data = new FormData()
                data.append("file", video)
                data.append("upload_preset", "z8oybloj")
                data.append("folder", "Video posts")
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/video/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: uid,
                            text: postText,
                            url: res.data.url,
                            type:'video',
                            groupID: parseInt(groupid)

                        }
                    }).then(()=>{
                        setImage(null)
                        setVideo(null)
                        refetch()
                        setLoading(false)
                        setPreview(null)
                        setPostText('')
                    }
                    )
                })
            } else {
                new_post({
                    variables: {
                        userID: uid,
                        text: postText,
                        url: '',
                        type:'text',
                        groupID: parseInt(groupid)
                    }
                }).then(()=>{
                    refetch()
                    setPostText('')
                })
            }
        }
    }

    const imageCB = useCallback(val => {
        setImage(val)
    }, [])
    const videoCB = useCallback(val => {
        setVideo(val)
    }, [])
    const previewCB = useCallback(val => {
        setPreview(val)
    }, [])
    const sizeErrorCB = useCallback(val => {
        setSizeError(val)
    }, [])
    const emojiCB = useCallback(val => {
        setPostText(postText+val)
    }, [postText])

    return (
        <form className="create-post-box" onSubmit={handleSubmit}>
            {sizeError && <p style={styles.sizeError}>File is too large! Max. size: 30MB</p>}
            {lengthErr && <p style={styles.sizeError}>Post too long! Max. characters: 5000</p>}
            {loading ? <div className='flex-ctr' style={{height:'100px'}}>
                            <div className='small-spinner'></div>
                        </div> :
                <>
                    <textarea 
                        type="text" 
                        id='text'
                        style={{...styles.textArea, border:emptyErr}} 
                        placeholder="Add new post..."
                        value={postText}
                        onFocus={()=>{setEmptyErr(false);setSizeError(false)}}
                        onChange={(e)=>setPostText(e.target.value)}
                    />

                    {(video && preview) && 
                        <VideoPreview 
                                videoCB={imageCB} 
                                previewCB={previewCB} 
                                preview={preview}
                        />}
                    {(image && preview) && 
                        <ImagePreview 
                            imageCB={videoCB} 
                            previewCB={previewCB} 
                            preview={preview}
                        />}
                    
                    <EmojisBox visible={true} emojiCB={emojiCB}/>

                    <div className="flex-sb" style={{marginTop:'10px'}}>
                        <div className='flex-ctr'>
                            <UploadImage 
                                imageCB={imageCB} 
                                videoCB={videoCB} 
                                previewCB={previewCB} 
                                sizeErrorCB={sizeErrorCB}
                            />
                            <UploadVideo 
                                imageCB={imageCB} 
                                videoCB={videoCB} 
                                previewCB={previewCB} 
                                sizeErrorCB={sizeErrorCB}
                            />
                        </div>
                        <button type='submit' className="post-button btn">POST</button>
                    </div>
                </>}
        </form>
    )
}

export default CreatePost


const styles = {
    textArea:{
        width:'100%',
        minHeight:'70px',
        resize:'none',
        padding:'5px',
        border:'none',
        outline:'none',
        fontSize:'14px'
    },
    removePreview:{
        height:'100%', 
        padding:'7px',
        backgroundColor:'#2f2f2f',
        cursor:'pointer'
    }
}
