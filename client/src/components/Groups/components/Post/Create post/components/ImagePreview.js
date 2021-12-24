import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ImagePreview = ({preview, previewCB, imageCB}) => {
    return (
        <div className='post-media-preview flex'>
            <img src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)} alt=''/>
            <div style={styles.removePreview} className='flex-ctr'>
                <FontAwesomeIcon
                    color='white'
                    icon='times'
                    onClick={()=>{imageCB(null);previewCB(null)}}
                />
            </div>
        </div>
    )
}

export default ImagePreview

const styles = {
    removePreview:{
        height:'100%', 
        padding:'7px',
        backgroundColor:'#2f2f2f',
        cursor:'pointer'
    }
}
