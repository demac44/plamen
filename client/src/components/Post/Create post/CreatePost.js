import React, { useEffect, useState } from 'react'
import axios from 'axios'


import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

import Dropzone from 'react-simple-dropzone/dist';

const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!, $url: String!, $type: String!){
        new_post(userID: $userID, post_text: $text, url: $url, type: $type){
            userID
        }
    }
`

const CreatePost = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [err, setErr] = useState('')
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const [added, setAdded] = useState(false)
    const [imageUpload, setImageUpload] = useState(false)
    const [loading, setLoading] = useState(false)

    const [new_post] = useMutation(NEW_POST)

    const handleSubmit = (e) => {
        e.preventDefault()
        let text = e.target.text.value
        
        if(text.trim().length < 1 && !image && !video){
            setErr('2px solid #E82c30')
            return
        } else {
            if (imageUpload){
                const data = new FormData()
                data.append("file", image)
                data.append("upload_preset", "z8oybloj")
                setLoading(true)  
                data.append("folder", "Posts")
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: ls.userID,
                            text: text,
                            url: res.data.url,
                            type:'image'
                        }
                    }).then(()=>{
                        setVideo(null)
                        setImage(null )
                        setAdded(true)
                        setLoading(false)
                        setImageUpload(false)
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
                            type:'video'
                        }
                    }).then(()=>{
                        setAdded(true)
                        setLoading(false)
                        setImageUpload(false)
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
                        type:'text'
                    }
                }).then(()=>{
                    setAdded(true)
                    e.target.text.value = ''
                })
            }
        }
    }

    return (
        <>
            <form className="create-post-box" onSubmit={handleSubmit}>

                {!loading && 
                <textarea 
                    type="text" 
                    name='text' 
                    style={{...styles.textArea, border:err}} 
                    placeholder="Add new post..."
                ></textarea>}

                {(!loading && imageUpload) && 
                <div>
                    <Dropzone onSuccessBlob={ (img) => {setImage(img);setVideo(null)} }/>
                </div>}

                {!loading && 
                <div className="flex-sb" style={{marginTop:'10px'}}>
                    <div className='flex-ctr'>

                        <i className="fas fa-images" onClick={() => setImageUpload(!imageUpload)}></i>
                        <p>Image</p>

                        <>
                            <label htmlFor='video_upload'>
                                <i className="fas fa-video" style={{marginLeft: "25px"}}></i>
                            </label>
                            <input type='file' id='video_upload' accept="video/*" style={{display:'none'}} onChange={(e)=>{
                                setVideo(e.target.files[0])
                                setImageUpload(false)
                                }}></input>
                            <p>Video</p>
                        </>
                    </div>
                    <button type='submit' className="post-button btn">POST</button>
                </div>}
            </form>
        </>
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
    }
}
