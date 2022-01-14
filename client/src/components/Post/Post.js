import React from 'react'
import PostTopBar from './Top bar/PostTopBar'
import PostMedia from './Media/PostMedia'
import PostTextBar from './Text bar/PostTextBar'
import PostBottomBar from './Bottom bar/PostBottomBar'
import './Post.css'

const Post = ({post, refetchPosts}) => {
    return (
        <div className='post'>
            <PostTopBar refetchPosts={refetchPosts} data={post}/>
            <PostMedia type={post.type} url={post.url}/>
            <PostTextBar post_text={post.post_text} postID={post.postID}/>
            <PostBottomBar postID={post.postID} userID={post.userID}/>
        </div>
    )
}

export default Post
