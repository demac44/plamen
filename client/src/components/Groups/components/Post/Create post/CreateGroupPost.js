import React, { useState } from 'react'
import axios from 'axios'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!, $url: String!, $type: String!, $groupID: Int!){
        create_group_post(userID: $userID, post_text: $text, url: $url, type: $type, groupID: $groupID){
            userID
        }
    }
`

const CreatePost = ({refetch, groupid}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [err, setErr] = useState('')
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null)

    const [new_post] = useMutation(NEW_POST)

    const handleSubmit = (e) => {
        e.preventDefault()
        let text = e.target.text.value
        
        if(text.trim().length < 1 && !image && !video){
            setErr('2px solid #E82c30')
            return
        } else {
            if (image){
                const data = new FormData()
                data.append("file", image)
                data.append("upload_preset", "z8oybloj")
                setLoading(true)  
                data.append("folder", "Group posts")
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: ls.userID,
                            text: text,
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
                const data = new FormData()
                data.append("file", video)
                data.append("upload_preset", "z8oybloj")
                data.append("folder", "Video posts")
                setLoading(true) 
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/video/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: ls.userID,
                            text: text,
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
                        e.target.text.value = ''
                    }
                    )
                })
            } else {
                new_post({
                    variables: {
                        userID: ls.userID,
                        text: text,
                        url: '',
                        type:'text',
                        groupID: parseInt(groupid)
                    }
                }).then(()=>{
                    refetch()
                    e.target.text.value = ''
                })
            }
        }
    }

    return (
        <form className="create-post-box" onSubmit={handleSubmit}>
            {loading ? <div className='flex-ctr' style={{height:'100px'}}>
                            <div className='small-spinner'></div>
                        </div> :
                <>
                    <textarea 
                        type="text" 
                        name='text' 
                        style={{...styles.textArea, border:err}} 
                        placeholder="Add new post..."
                    ></textarea>

                    {(video && preview) && 
                    <div className='post-media-preview flex'>
                        <video src={preview} 
                            onLoad={()=>URL.revokeObjectURL(preview)}/>
                        <div style={styles.removePreview} className='flex-ctr'>
                            <FontAwesomeIcon
                                color='white'
                                icon='times'
                                onClick={()=>{setVideo(null);setPreview(null)}}
                            />
                        </div>
                    </div>}

                    {(image && preview) &&
                    <div className='post-media-preview flex'>
                        <img src={preview} 
                            onLoad={()=>URL.revokeObjectURL(preview)} alt=''/>
                        <div style={styles.removePreview} className='flex-ctr'>
                            <FontAwesomeIcon
                                color='white'
                                icon='times'
                                onClick={()=>{setImage(null);setPreview(null)}}
                            />
                        </div>
                    </div>}


                    <div className="flex-sb" style={{marginTop:'10px'}}>
                        <div className='flex-ctr'>
                            {/* upload image */}
                            <>
                                <label htmlFor='image_upload' className='flex-ctr'>
                                    <FontAwesomeIcon icon='images' size='lg' color='white'/>
                                    <p>Image</p>
                                </label>
                                <input 
                                    type='file' 
                                    id='image_upload' 
                                    accept="image/*" 
                                    style={{display:'none'}} 
                                    onChange={(e)=>{
                                        setVideo(null)
                                        setImage(e.target.files[0])
                                        setPreview(URL.createObjectURL(e.target.files[0]))
                                        }}
                                />
                            </>

                            {/* upload video */}
                            <>
                                <label htmlFor='video_upload' className='flex-ctr'>
                                    <FontAwesomeIcon 
                                        icon='video' 
                                        size='lg'
                                        color='white' 
                                        style={{marginLeft: "25px"}}
                                    />
                                    <p>Video</p>
                                </label>
                                <input 
                                    type='file' 
                                    id='video_upload' 
                                    accept="video/*" 
                                    style={{display:'none'}} 
                                    onChange={(e)=>{
                                        setImage(null)
                                        setVideo(e.target.files[0])
                                        setPreview(URL.createObjectURL(e.target.files[0]))
                                        }}
                                />
                            </>
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
