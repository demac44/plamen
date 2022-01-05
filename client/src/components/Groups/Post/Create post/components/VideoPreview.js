import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style.css'
const VideoPreview = ({preview, videoCB, previewCB}) => {
    return (
        <div className='post-media-preview flex'>
            <video src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)}/>
            <div className='flex-ctr clear-preview-btn' onClick={()=>{previewCB(null);videoCB(null)}}>
                <FontAwesomeIcon
                    color='white'
                    icon='times'
                />
            </div>
        </div>
    )
}
export default VideoPreview