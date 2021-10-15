import React from 'react'
import AddComment from './Post components/AddComment'
import InfoSave from './Post components/InfoSave'
import PostImage from './Post components/PostImage'
import PostText from './Post components/PostText'

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
