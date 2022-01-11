import React from 'react'
import '../style.css'
const VideoPreview = ({preview, videoCB, previewCB}) => {
    return (
        <div className='post-media-preview flex'>
            <video src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)}/>
            <div className='flex-ctr clear-preview-btn' onClick={()=>{previewCB(null);videoCB(null)}}>
                <i
                    className='fas fa-times'
                />
            </div>
        </div>
    )
}
export default VideoPreview