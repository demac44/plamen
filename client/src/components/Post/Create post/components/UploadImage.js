import React from 'react'

const UploadImage = ({imageCB, videoCB, previewCB, sizeErrorCB}) => {
    return (
        <>
            <label htmlFor='image_upload' className='flex-ctr'>
                <i className='fas fa-images'/>
                <p>Image</p>
            </label>
            <input 
                type='file' 
                id='image_upload' 
                accept="image/*" 
                style={{display:'none'}} 
                onChange={(e)=>{
                    sizeErrorCB(false)
                    if(e.target.files[0].size>31457280){
                        sizeErrorCB(true)
                        e.target.value=null
                        return null
                    } else {
                        videoCB(null)
                        imageCB(e.target.files[0])
                        previewCB(URL.createObjectURL(e.target.files[0]))
                    }
                }}
            />
        </>
    )
}

export default UploadImage
