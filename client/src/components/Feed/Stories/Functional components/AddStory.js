import React, { useState } from 'react'
// import Dropzone from 'react-simple-dropzone/dist';



const AddStory = () => {
    const [media, setMedia] = useState(null)


    const handleUpload = () => {

    }


    return (
        <form onSubmit={handleUpload}>
            <label htmlFor='upload-story' className='add-story-btn flex-ctr'>
                <div>
                    <i className='fas fa-plus'></i>
                </div>
            </label>
            <input type='file' accept='video/*, image/*' id='upload-story' style={{display:'none'}}/>
        </form>
    )
}

export default AddStory
