import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UploadVideo = ({videoCB, imageCB, previewCB, sizeErrorCB}) => {
    return (
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
                    sizeErrorCB(false)
                    if(e.target.files[0].size>31457280){
                    } else {
                        imageCB(null)
                        videoCB(e.target.files[0])
                        previewCB(URL.createObjectURL(e.target.files[0]))
                    }
                    }}
            />
        </>
    )
}

export default UploadVideo
