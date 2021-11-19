import React, { useState } from 'react'

const AddStory = () => {
    const [media, setMedia] = useState(null)
    const [path, setPath] = useState('')


    const handleUpload = () => {

    }


    return (
        <form onSubmit={handleUpload}>
            <label htmlFor='upload-story' className='add-story-btn flex-ctr'>
                <div>
                    <i className='fas fa-plus'></i>
                </div>
            </label>
            <input type='file' accept='video/*, image/*' id='upload-story' onChange={(e)=>{
                    setMedia(e.target.files[0])
                    setPath(URL.createObjectURL(e.target.files[0]))
                }} style={{display:'none'}}/>
            {/* {path && <img src={path} onLoad={()=>URL.revokeObjectURL(path)}></img>} */}
        </form>
    )
}

export default AddStory
