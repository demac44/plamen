import React from 'react'
import Avatar from '../UI/Avatar'

import '../../App.css'
import '../../General.css'

const AddPost = () => {
    return (
        <div className="add-np-box" style={{width:'70%'}}>
            <div className="add-np-txt">
                <Avatar height='100%'/>
                <textarea type="text" className="add-np-input" placeholder="Add new post..."></textarea>
            </div>
            <div className="add-np-tbtn">
                <div className="add-np-types">
                    <i className="fas fa-images"></i>
                    <p>Image</p>
                    <i className="fas fa-video" style={{marginLeft: "25px"}}></i>
                    <p>Video</p>
                </div>
                <button className="fp-cmt-btn">POST</button>
            </div>
        </div>
    )
}

export default AddPost
