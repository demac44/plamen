import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MsgPreviewBox = ({media, preview, clearFiles}) => {
    return (
        <div style={styles.imgPreviewBar}>
            {media.type.slice(0,5)==='image' &&
            <img style={styles.previewMedia} src={preview} 
                onLoad={()=>URL.revokeObjectURL(preview)} alt=''/>}

            {media.type.slice(0,5)==='video' &&
                <video style={styles.previewMedia} src={preview}
                onLoad={()=>URL.revokeObjectURL(preview)}></video>}
            <div style={styles.clear} onClick={clearFiles} className='flex-ctr'><FontAwesomeIcon icon='times'/></div>
        </div>
    )
}

export default MsgPreviewBox

const styles = {
    imgPreviewBar:{
        width:'100%',
        height:'100px',
        backgroundColor: '#1f1f1f',
        position:'absolute',
        bottom:'50px',
        zIndex:'10000000000000000000000000000',
        padding:'5px',
        display:'flex'
    },
    previewMedia:{
        height:'100%',
        maxWidth:'100%'
    },
    clear: {
        width:'30px',
        height:'100%',
        backgroundColor:'#4f4f4f',
        fontSize:'20px',
        color:'white',
        cursor:'pointer'
    }
}