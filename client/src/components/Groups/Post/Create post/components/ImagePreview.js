import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style.css'

const ImagePreview = ({preview, previewCB, imageCB}) => {
    return (
        <div className='post-media-preview flex'>
            <img src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)} alt=''/>
            <div className='flex-ctr clear-preview-btn' onClick={()=>{imageCB(null);previewCB(null)}}>
                <FontAwesomeIcon
                    color='white'
                    icon='times'
                />
            </div>
        </div>
    )
}
export default ImagePreview