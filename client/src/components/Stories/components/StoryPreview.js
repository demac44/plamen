import React, {memo, useState} from 'react'
import { useSelector } from 'react-redux';
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


const StoryPreview = ({previewMedia, media, exitCallback, refetch, sizeError}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const user = JSON.parse(localStorage.getItem('user'))
    const [loading, setLoading] = useState(false)
    const [new_story] = useMutation(ADD_STORY)

    const handleUpload = () => {
        setLoading(true)
        const data = new FormData()
        data.append("file", media)
        data.append("upload_preset", "z8oybloj")
        data.append("folder", "Stories media")
        axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${media.type.slice(0,5)}/upload`, data)
        .then(res => {
                new_story({
                    variables: {
                        uid,
                        type: media.type.slice(0,5),
                        url: res.data.url
                    }
            }).then(()=>{
                exitCallback()
                refetch()
                setLoading(false)
                }
            )
        })
    }

    return (
        <div className='flex-col-ctr overlay' style={{backgroundColor: '#1b1b1b'}}>
            <div className='story-box'>
                <StoryBar user={user} closeStoryCallback={exitCallback}/>
                {sizeError && <p className='size-err'>File is too large! Max.size: 15MB</p>}
                {loading ? <div className='flex-ctr wh-100' style={{backgroundColor:'#2f2f2f'}}><div className='small-spinner'></div></div> :
                <div className='story-media flex-ctr'>
                    {media.type.slice(0,5)==='image' && 
                        <img  src={previewMedia} onLoad={()=>URL.revokeObjectURL(previewMedia)} alt=''/>
                    }
                    {media.type.slice(0,5)==='video' && 
                        <video src={previewMedia} onLoad={()=>URL.revokeObjectURL(previewMedia)} controls/>
                    }
                </div>}
                <div className='story-bottom-bar'>
                    <button className='btn' onClick={handleUpload} disabled={loading || sizeError}>UPLOAD</button>
                </div>
            </div>
        </div>
    )
}

export default memo(StoryPreview)