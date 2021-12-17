import React, { useState } from 'react'

import Dropzone from 'react-simple-dropzone/dist';
import axios from 'axios';

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo';

const EDIT_PFP = gql`
    mutation ($userID: Int!, $pfp: String!){
        edit_pfp(userID: $userID, profile_picture: $pfp) {userID}
    }
`


const EditPfpMenu = ({closeMenu}) => {
    const [showDropzone, setShowDropzone] = useState(false)
    const [image, setImage] = useState(null);
    const [edit_pfp] = useMutation(EDIT_PFP)
    const user = JSON.parse(localStorage.getItem('user'))


    const handlePfpChange = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "ms8dmaqw")
        data.append("folder", "Profile pictures")
        axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
        .then(res => {
            edit_pfp({
                variables: {
                    userID: user.userID,
                    pfp: res.data.url
                }
            }).then(()=>{
                let u = {...user, profile_picture:user.profile_picture=res.data.url}
                localStorage.setItem('user', JSON.stringify(u))
                closeMenu(false)
            })
        })
    }

    const handlePfpRemove = () => {
        edit_pfp({
            variables:{
                userID: user.userID,
                pfp: ""
            }
        }).then(()=>{
            let u = {...user, profile_picture:user.profile_picture=null}
            localStorage.setItem('user', JSON.stringify(u))
            closeMenu(false)
        })
    }


    return (
        <div className='overlay flex-ctr' style={{backgroundColor:'rgba(0,0,0,0.7)'}}>
            <div className='edit-pfp-menu'>
                <ul>
                    {!showDropzone && <li onClick={()=>setShowDropzone(true)}>Change profile picture</li>}
                    {showDropzone && <div style={styles.dropzoneBox} className='flex-col-ctr'>
                        <Dropzone onSuccessBlob={ (img) => {setImage(img)} }/>
                        {image && <button className='btn' style={styles.editBtn} onClick={handlePfpChange}>Change</button>}
                        </div>}   
                    <li onClick={handlePfpRemove}>Remove profile picture</li>
                    <li onClick={()=>closeMenu(false)}>Cancel</li>
                </ul>
            </div>
        </div>
    )
}

export default EditPfpMenu


const styles = {
    dropzoneBox:{
        padding:'5px',
        borderRadius: '21px',
    },
    editBtn: {
        width: '100px',
        height: '30px',
        marginTop: '15px',
        color:'white',
        backgroundColor:'#1b1b1b',
        border:'1px solid #2f2f2f',
    }
}