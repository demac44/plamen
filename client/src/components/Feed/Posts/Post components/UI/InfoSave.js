import React from 'react'
import Avatar from '../../../../UI/Avatar'
import SavePost from '../Functional components/SavePost'

import '../../../../../App.css'
import PostOptBtn from '../Functional components/PostOptBtn'
import { NavLink } from 'react-router-dom'

const InfoSave = ({date, postID, user}) => {
    return (
        <div className="fp-info-save">
            <div className="fp-info">
                <NavLink exact to={'/profile/'+user.userID} style={{height:'100%'}}>
                    <Avatar height='100%' pfp={user.profile_picture}/>
                </NavLink>
                <div>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <p style={{fontSize:'10px'}}>{date}</p>
                </div>
            </div>
            <div className="fp-like-save">
                <SavePost postID={postID}/>
                {user.currentUser && <PostOptBtn postID={postID}/>}
            </div>
        </div>
    )
}

export default InfoSave
