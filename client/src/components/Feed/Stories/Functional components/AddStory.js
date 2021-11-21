import React, { useCallback, useState } from 'react'
import StoryPreview from './StoryPreview'

const AddStory = ({updatedCallback}) => {
    const [media, setMedia] = useState(null)
    const [preview, setPreview] = useState('')

    const clearInput = () => {
        setMedia(null)
        setPreview(null)
    }
 
    const exitCallback = useCallback(()=>{
        clearInput()
    }, [clearInput])


    return (
        <>
        <div style={{height:'100%'}}>
            <label htmlFor='upload-story' className='add-story-btn flex-ctr'>
                <div>
                    <i className='fas fa-plus'></i>
                </div>
            </label>
            <input type='file' accept='video/*, image/*' id='upload-story' onChange={(e)=>{
                    setMedia(e.target.files[0])
                    setPreview(e.target.value ? URL.createObjectURL(e.target.files[0]) : null)
                }} style={{display:'none'}}/>
        </div>
        {(preview && media) && <StoryPreview preview={preview} media={media} exitCallback={exitCallback} updatedCallback={updatedCallback}/>}
        </>
    )
}

export default AddStory
