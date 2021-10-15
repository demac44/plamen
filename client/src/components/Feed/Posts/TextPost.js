import React from 'react'
import AddComment from './Post components/AddComment'
import InfoSave from './Post components/InfoSave'
import PostText from './Post components/PostText'

const TextPost = () => {
    return (
        <div className="post">
            <InfoSave/>
            <PostText/>
            <AddComment/>
        </div>
    )
}

export default TextPost
