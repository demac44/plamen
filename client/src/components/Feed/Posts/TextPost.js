import React from 'react'
import AddComment from './Post components/UI/AddComment'
import InfoSave from './Post components/UI/InfoSave'
import PostText from './Post components/UI/PostText'

const TextPost = ({width, post}) => {
    return (
        <div className="post" style={{width:width}}>
            <InfoSave date={post.date_published} id={post.tpostID}/>
            <PostText content={post.post_content}/>
            <AddComment/>
        </div>
    )
}

export default TextPost
