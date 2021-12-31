import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MsgPreviewBox = ({media, preview, clearFiles}) => {
    return (
        <div className='msg-preview-bar flex'>
            {media.type.slice(0,5)==='image' &&
            <img className='msg-preview-media' src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)} alt=''/>}

            {media.type.slice(0,5)==='video' &&
                <video className='msg-preview-media' src={preview}
                onLoad={()=>URL.revokeObjectURL(preview)}></video>}
            <div className='flex-ctr msg-preview-clear-btn'><FontAwesomeIcon icon='times'/></div>
        </div>
    )
}

export default MsgPreviewBox
