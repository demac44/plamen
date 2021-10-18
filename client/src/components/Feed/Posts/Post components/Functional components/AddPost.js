import React, { useState } from 'react'
import axios from 'axios'

import Avatar from '../../../../UI/Avatar'

import '../../../../../App.css'
import '../../../../../General.css'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

import Dropzone from 'react-simple-dropzone/dist';


const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!, $url: String!){
        new_post(userID: $userID, post_text: $text, url: $url){
            userID
        }
    }
`

const AddPost = ({width, user}) => {
    const [err, setErr] = useState('1px solid grey')
    const [image, setImage] = useState(null);
    const [imageUpload, setImageUpload] = useState(false)
    let text;

    const [new_post] = useMutation(NEW_POST)

    const handleSubmit = (e) => {
        e.preventDefault()
        text = text.value
        
        if(text.trim().length < 1){
            setErr('3px solid #E82c30')
            return
        } else {
            if (imageUpload){
                const data = new FormData()
                data.append("file", image)
                data.append("upload_preset", "z8oybloj")
                data.append("folder", "Posts")
                axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: user.userID,
                            text: text,
                            url: res.data.url
                        }
                    })
                    window.location.reload()
                })
            } else {
                new_post({
                    variables: {
                        userID: user.userID,
                        text: text,
                        url: ''
                    }
                })
                window.location.reload()
            }
        }
    }

    return (
        <>
            <form className="add-np-box" style={{width:width}} onSubmit={handleSubmit}>
                <div className="add-np-txt">
                    <Avatar height='100%' pfp={user.profile_picture}/>
                    <textarea type="text" className="add-np-input" style={{border:err}} ref={value => text = value} placeholder="Add new post..."></textarea>
                </div>
                {imageUpload && 
                <div className='dropzone-box'>
                    <Dropzone onSuccessBlob={ (img) => setImage(img) }/>
                </div>}
                <div className="add-np-tbtn">
                    <div className="add-np-types">
                        <i className="fas fa-images" onClick={() => setImageUpload(!imageUpload)}></i>
                        <p>Image</p>
                        <i className="fas fa-video" style={{marginLeft: "25px"}}></i>
                        <p>Video</p>
                    </div>
                    <button type='submit' className="fp-cmt-btn">POST</button>
                </div>
            </form>
        </>
    )
}

export default AddPost

