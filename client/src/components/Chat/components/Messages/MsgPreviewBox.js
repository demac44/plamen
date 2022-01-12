import React from 'react'

const MsgPreviewBox = ({media, preview, clearFiles}) => {
    return (
        <div className='msg-preview-bar flex'>
            {media.type.slice(0,5)==='image' &&
            <img className='msg-preview-media' src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)} alt=''/>}

            {media.type.slice(0,5)==='video' &&
                <video className='msg-preview-media' src={preview}
                onLoad={()=>URL.revokeObjectURL(preview)}></video>}
            <div className='flex-ctr msg-preview-clear-btn' onClick={()=>clearFiles()}><i className='fas fa-times'/></div>
        </div>
    )
}

export default MsgPreviewBox
