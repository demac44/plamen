import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import VideoPreview from './components/VideoPreview'
import ImagePreview from './components/ImagePreview'
import UploadImage from './components/UploadImage'
import UploadVideo from './components/UploadVideo'
import EmojisBox from '../../General components/Emojis/EmojisBox'
import './style.css'

const CreatePost = ({refetch}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [emptyErr, setEmptyErr] = useState('')
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null)
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
                const data = new FormData()
                data.append("file", image)
                data.append("upload_preset", "z8oybloj")
                setLoading(true)  
                data.append("folder", "Posts")
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: uid,
                            text: postText,
                            url: res.data.url,
                            type:'image'
                        }
                    }).then(()=>{
                        setVideo(null)
                        setImage(null )
                        setPreview(null)
                        setLoading(false)
                        refetch()
                        setPostText('')
                    }
                    )
                })
            } else if (video) {
                const data = new FormData()
                data.append("file", video)
                data.append("upload_preset", "z8oybloj")
                data.append("folder", "Video posts")
                setLoading(true) 
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/video/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: uid,
                            text: postText,
                            url: res.data.url,
                            type:'video'
                        }
                    }).then(()=>{
                        setImage(null)
                        setVideo(null)
                        setPreview(null)
                        refetch()
                        setLoading(false)
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
                        type:'text'
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
            {sizeError && <p className='size-err-msg'>File is too large! Max. size: 30MB</p>}
            {lengthErr && <p className='size-err-msg'>Post too long! Max. characters: 5000</p>}
            {loading ? <div className='flex-ctr' style={{height:'100px'}}>
                            <div className='small-spinner'></div>
                        </div> :
                <>
                    <textarea 
                        type="text" 
                        id='text'
                        value={postText}
                        style={{border:emptyErr}} 
                        className='create-post-textarea'
                        placeholder="Add new post..."
                        onFocus={()=>{setEmptyErr(false);setSizeError(false);setLengthErr(false)}}
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

const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!, $url: String!, $type: String!){
        new_post(userID: $userID, post_text: $text, url: $url, type: $type){
            userID
        }
    }
`