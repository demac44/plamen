import React, { useCallback, useState, memo } from 'react'
import StoryPreview from './StoryPreview'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const AddStory = ({refetch}) => {
    const [media, setMedia] = useState(null)
    const [previewMedia, setPreviewMedia] = useState('')
    const [sizeError, setSizeError] = useState(false)

    const exitCallback = useCallback(()=>{
        setMedia(null)
        setPreviewMedia(null)
        setSizeError(false)
    }, [setMedia, setPreviewMedia])

    return (
        <>
        <div style={{height:'100%'}}>
            <label htmlFor='upload-story' className='flex-ctr' style={styles.addBtn}>
                <div>
                    <FontAwesomeIcon icon='plus' size='lg' color='white'/>
                </div>
            </label>
            <input type='file' accept='video/*, image/*' id='upload-story' onChange={(e)=>{
                    setSizeError(false)
                    if(e.target.files[0].size>15728640){
                        setSizeError(true)
                        setMedia(e.target.files[0])
                        setPreviewMedia(e.target.value ? URL.createObjectURL(e.target.files[0]) : null)
                    } else {
                        setMedia(e.target.files[0])
                        setPreviewMedia(e.target.value ? URL.createObjectURL(e.target.files[0]) : null)
                    }
                }} style={{display:'none'}}/>
        </div>
        {(previewMedia && media) && 
            <StoryPreview 
                previewMedia={previewMedia} 
                media={media} 
                exitCallback={exitCallback}
                refetch={refetch}
                sizeError={sizeError}
            />}
        </>
    )
}

export default memo(AddStory)

const styles = {
    addBtn:{
        height: '64px',
        width:'64px',
        borderRadius: '50%',
        cursor: 'pointer',
        backgroundColor: '#4f4f4f',
        overflow:' hidden',
        border: '2px solid greenyellow'
    }
}