import React from 'react'
import StoryBar from '../components/StoryBar'
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


const StoryPreview = ({preview, media, exitCallback, updatedCallback}) => {
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
                updatedCallback(true)
            }
            )
        })
    }

    const handleClose = () => {
        exitCallback()
    }

    return (
        <div className='story-preview flex-col-ctr'>
            <div className='story-box'>
                <StoryBar user={ls}/>
                <div className='story-media flex-ctr'>
                    {media.type.slice(0,5)==='image' && 
                        <img  src={preview} onLoad={()=>URL.revokeObjectURL(preview)}/>
                    }
                    {media.type.slice(0,5)==='video' && 
                        <video src={preview} onLoad={()=>URL.revokeObjectURL(preview)} controls/>
                    }
                </div>
                <div className='story-bottom-wrap'>
                    <button className='story-btn btn' onClick={handleUpload}>UPLOAD</button>
                    <button className='story-btn btn' onClick={handleClose}>BACK</button>
                </div>
            </div>
        </div>
    )
}

export default StoryPreview

