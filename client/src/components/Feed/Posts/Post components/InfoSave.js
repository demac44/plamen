import React from 'react'
import Avatar from '../../../UI/Avatar'
import LikePost from './Functional components/LikePost'
import SavePost from './Functional components/SavePost'

const InfoSave = () => {
    return (
        <div className="fp-info-save">
            <div className="fp-info">
                <Avatar height='100%'/>
                <p>Demir Umejr</p>
            </div>
            <div className="fp-like-save">
                <LikePost/>
                <SavePost/>
            </div>
        </div>
    )
}

export default InfoSave
