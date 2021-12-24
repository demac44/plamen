import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VideoPreview = ({preview, videoCB, previewCB}) => {
    return (
        <div className='post-media-preview flex'>
            <video src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)}/>
            <div style={styles.removePreview} className='flex-ctr'>
                <FontAwesomeIcon
                    color='white'
                    icon='times'
                    onClick={()=>{previewCB(null);videoCB(null)}}
                />
            </div>
        </div>
    )
}

export default VideoPreview

const styles = {
    removePreview:{
        height:'100%', 
        padding:'7px',
        backgroundColor:'#2f2f2f',
        cursor:'pointer'
    }
}
