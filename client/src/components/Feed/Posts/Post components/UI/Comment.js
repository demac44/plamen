import React, { useEffect } from 'react'
import Avatar from '../../../../UI/Avatar'


import '../../../../../App.css'
import '../../../../../General.css'

const Comment = ({comment}) => {


    return (
        <div className='comment-cont'>
            <div style={{width:'40px',display: 'flex'}}>
                <Avatar height='40px' pfp={comment.profile_picture}/>
            </div>
            <div style={{marginLeft:'10px'}}>
                <h5 style={{fontSize:'14px'}}>{comment.username}</h5>
                <p style={{fontSize:'10px',marginTop:'5px'}}>{comment.date_commented}</p>
            </div>
            <div style={{marginLeft:'15px',padding:'5px'}}>
                <p style={{fontSize:'15px'}}>{comment.comment_text}</p>
            </div>
        </div>
    )
}

export default Comment
