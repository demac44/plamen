import React from 'react'
import Avatar from '../../../../UI/Avatar'
import LikePost from '../Functional components/LikePost'
import SavePost from '../Functional components/SavePost'

import '../../../../../App.css'
import PostOptBtn from '../Functional components/PostOptBtn'

const InfoSave = ({date, postID, user}) => {
    return (
        <div className="fp-info-save">
            <div className="fp-info">
                <Avatar height='100%' pfp={user.profile_picture}/>
                <div>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <p style={{fontSize:'10px'}}>{date}</p>
                </div>
            </div>
            <div className="fp-like-save">
                <LikePost/>
                <SavePost/>
                {user.currentUser && <PostOptBtn postID={postID}/>}
            </div>
        </div>
    )
}

export default InfoSave
