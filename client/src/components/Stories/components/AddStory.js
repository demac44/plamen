import React, { useCallback, useState } from 'react'
import StoryPreview from './StoryPreview'

const AddStory = ({refetch}) => {
    const [media, setMedia] = useState(null)
    const [previewMedia, setPreviewMedia] = useState('')

    const exitCallback = useCallback(()=>{
        setMedia(null)
        setPreviewMedia(null)
    }, [setMedia, setPreviewMedia])

    return (
        <>
        <div style={{height:'100%'}}>
            <label htmlFor='upload-story' className='flex-ctr' style={styles.addBtn}>
                <div>
                    <i style={{color:'white', fontSize:'30px'}} className='fas fa-plus'></i>
                </div>
            </label>
            <input type='file' accept='video/*, image/*' id='upload-story' onChange={(e)=>{
                    setMedia(e.target.files[0])
                    setPreviewMedia(e.target.value ? URL.createObjectURL(e.target.files[0]) : null)
                }} style={{display:'none'}}/>
        </div>
        {(previewMedia && media) && 
            <StoryPreview 
                previewMedia={previewMedia} 
                media={media} 
                exitCallback={exitCallback}
                refetch={refetch}
            />}
        </>
    )
}

export default AddStory

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