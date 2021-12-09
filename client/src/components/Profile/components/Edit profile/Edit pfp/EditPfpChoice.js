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


const EditPfpChoice = ({callback}) => {
    const [showDropzone, setShowDropzone] = useState(false)
    const [image, setImage] = useState(null);
    const [edit_pfp] = useMutation(EDIT_PFP)
    const user = JSON.parse(localStorage.getItem('user'))


    const exitMenu = () => {
        callback(false)
        setShowDropzone(false)
    }

    const handlePfpChange = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "z8oybloj")
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
                callback(false)
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
            callback(false)
        })
    }


    return (
        <div className='edit-pfp-container flex-ctr'>
            <div className='edit-pfp-menu'>
                <ul>
                    {!showDropzone && <li onClick={()=>setShowDropzone(true)}>Change profile picture</li>}
                    {showDropzone && <div style={styles.dropzoneBox}>
                        <Dropzone onSuccessBlob={ (img) => {setImage(img)} }/>
                        {image && <button className='btn' style={styles.editBtn} onClick={handlePfpChange}>Change</button>}
                        </div>}   
                    <li onClick={handlePfpRemove}>Remove profile picture</li>
                    <li onClick={exitMenu}>Cancel</li>
                </ul>
            </div>
        </div>
    )
}

export default EditPfpChoice


const styles = {
    dropzoneBox:{
        border: '2px dashed black',
        borderRadius: '21px',
        margin:'2px'
    },
    editBtn: {
        width: '100px',
        height: '30px',
        backgroundColor: '#5f5f5f',
        marginLeft: '50%',
        transform: 'translate(-50%)',
        marginBottom: '10px',
        color:'white'
    }
}