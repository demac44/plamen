import React, { useEffect, useState } from 'react'
import AddCommLike from './Post components/UI/AddCommLike'
import InfoSave from './Post components/UI/InfoSave'
import PostImg from './Post components/UI/PostImg'
import PostText from './Post components/UI/PostText'

const Post = ({width, post, user}) => {

    return (
        <div className="post" style={{width:width}}>
            <InfoSave date={post.date_posted} user={user} postID={post.postID}/>
            <PostImg url={post.url}/>
            <PostText content={post.post_text}/>
            <AddCommLike postID={post.postID}/>
        </div>
    )
}

export default Post
