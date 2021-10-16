import React from 'react'
import Avatar from '../../../../UI/Avatar'
import LikePost from '../Functional components/LikePost'
import SavePost from '../Functional components/SavePost'

import '../../../../../App.css'
import PostOptBtn from '../Functional components/PostOptBtn'

const InfoSave = ({date, id}) => {
    let ls = JSON.parse(localStorage.getItem('user')) 
    return (
        <div className="fp-info-save">
            <div className="fp-info">
                <Avatar height='100%'/>
                <div>
                    <p>{ls.fname+' '+ls.lname}</p>
                    <p style={{fontSize:'10px'}}>{date}</p>
                </div>
            </div>
            <div className="fp-like-save">
                <LikePost/>
                <SavePost/>
                <PostOptBtn id={id}/>
            </div>
        </div>
    )
}

export default InfoSave
