import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '../../../../../App.css'
import '../../../../../General.css'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

import Dropzone from 'react-simple-dropzone/dist';
import Loader from '../../../../UI/Loader'

const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!, $url: String!, $type: String!){
        new_post(userID: $userID, post_text: $text, url: $url, type: $type){
            userID
        }
    }
`

const AddPost = ({width, updatedCallback}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [err, setErr] = useState('')
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const [added, setAdded] = useState(false)
    const [imageUpload, setImageUpload] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        updatedCallback(added)
        setAdded(false)
    },[updatedCallback, added])

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
                            userID: user.userID,
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
                            userID: user.userID,
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
                        userID: user.userID,
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
            <form className="add-np-box" style={{width:width}} onSubmit={handleSubmit}>
                {loading && <Loader size='small'/>}
                {!loading && <div className="add-np-txt">
                    <textarea type="text" className="add-np-input" name='text' style={{border:err}} placeholder="Add new post..."></textarea>
                </div>}
                {(!loading && imageUpload) && 
                <div className='dropzone-box'>
                    <Dropzone onSuccessBlob={ (img) => {setImage(img);setVideo(null)} }/>
                </div>}
                {!loading && <div className="add-np-tbtn">
                    <div className="add-np-types">
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
                    <button type='submit' className="fp-cmt-btn">POST</button>
                </div>}
            </form>
        </>
    )
}

export default AddPost

