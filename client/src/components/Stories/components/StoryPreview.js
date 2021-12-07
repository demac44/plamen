import React from 'react'
import StoryBar from './StoryBar'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import axios from 'axios'

const ADD_STORY = gql`
    mutation ($uid: Int!, $url: String, $type: String!){
        create_story (userID: $uid, url: $url, type: $type){
            userID
        }
    }
`


const StoryPreview = ({previewMedia, media, exitCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [new_story] = useMutation(ADD_STORY)

    const handleUpload = () => {
        const data = new FormData()
        data.append("file", media)
        data.append("upload_preset", "z8oybloj")
        data.append("folder", "Stories media")
        axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${media.type.slice(0,5)}/upload`, data)
        .then(res => {
                new_story({
                    variables: {
                        uid: ls.userID,
                        type: media.type.slice(0,5),
                        url: res.data.url
                    }
            }).then(()=>{
                exitCallback()
                }
            )
        })
    }

    const handleClose = () => {
        exitCallback()
    }

    return (
        <div className='story-overlay flex-col-ctr'>
            <div className='story-box'>
                <StoryBar user={ls} closeStoryCallback={exitCallback}/>
                <div className='story-media flex-ctr'>
                    {media.type.slice(0,5)==='image' && 
                        <img  src={previewMedia} onLoad={()=>URL.revokeObjectURL(previewMedia)} alt=''/>
                    }
                    {media.type.slice(0,5)==='video' && 
                        <video src={previewMedia} onLoad={()=>URL.revokeObjectURL(previewMedia)} controls/>
                    }
                </div>
                <div className='story-bottom-bar'>
                    <button className='story-upload-btn btn' onClick={handleUpload}>UPLOAD</button>
                </div>
            </div>
        </div>
    )
}

export default StoryPreview

