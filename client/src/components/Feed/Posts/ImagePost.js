import React from 'react'
import AddComment from './Post components/UI/AddComment'
import InfoSave from './Post components/UI/InfoSave'
import PostImage from './Post components/UI/PostImage'
import PostText from './Post components/UI/PostText'

const ImagePost = () => {
    return (
        <div className="post">
            <InfoSave/>
            <PostImage/>
            <PostText/>
            <AddComment/>
        </div>
    )
}

export default ImagePost
