import React, { useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import axios from 'axios'
 
const ChangeBannerMenu = ({groupID, closeMenu, refetch}) => {
    const [change_banner] = useMutation(CHANGE_BANNER)
    const [loading, setLoading] = useState(false)
    const [sizeError, setSizeError] = useState(false)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleChange = () => {     
        setLoading(true)   
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "z8oybloj")
        setLoading(true)  
        data.append("folder", "Community banners")
        axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
        .then(res => {
            change_banner({
                variables: {
                    gid: groupID,
                    banner_image: res.data.url
                }
            }).then(()=>{
                setLoading(false)
                closeMenu()
                refetch()
            }
        )})
    }

    const handleRemove = () => {
        change_banner({
            variables:{
                gid: groupID,
                banner_image: ''
            }
        }).then(()=>{
            closeMenu()
            refetch()
        })
    }

    return (
        <div className='overlay flex-ctr' style={{backgroundColor:'rgba(0,0,0,0.8)'}}>
            <div className='change-banner-menu box flex-col-ctr'>
                {sizeError && <p className='err-msg'>Image is too large! Max.size: 30MB</p>}
                {loading ? <div className='small-spinner'></div> :
                (<>
                    <label htmlFor='input_file'>
                        <p>Change banner</p>
                    </label>
                    <input 
                    type='file' 
                    id='input_file' 
                    accept="image/*" 
                    style={{display:'none'}} 
                    onChange={(e)=>{
                        setSizeError(false)
                        if(e.target.files[0].size>31457280){
                            setSizeError(true)
                            e.target.value=null
                            return null
                        } else {
                            setImage(e.target.files[0])
                            setPreview(URL.createObjectURL(e.target.files[0]))
                        }
                    }}
                    />
                    {(image && preview) &&
                    <div className='banner-media-preview flex-ctr'>
                        <img src={preview} 
                            onLoad={()=>URL.revokeObjectURL(preview)} alt=''/>
                        <div className='flex-ctr clear-banner_preview-btn' onClick={()=>{setImage(null);setPreview(null)}}>
                            <i className='fas fa-times'/>
                        </div>
                    </div>}
                    {(image && preview) && <button onClick={handleChange} className='btn save-banner-btn'>SAVE</button>}
                </>)}

                <span onClick={handleRemove}>Remove banner</span>

                <span onClick={()=>closeMenu()}>Cancel</span>
            </div>
        </div>
    )
}

export default ChangeBannerMenu

const CHANGE_BANNER = gql`
    mutation($gid: Int!, $banner_image: String!){
        change_community_banner(groupID: $gid, banner_image: $banner_image){
            groupID
        }
    }
`