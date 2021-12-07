import React from 'react'

import PostTopBar from './Top bar/PostTopBar'
import PostMedia from './Media/PostMedia'
import PostTextBar from './Text bar/PostTextBar'
import PostComments from './Comments/PostComments'
import PostBottomBar from './Bottom bar/PostBottomBar'

import './Post.css'

const Post = ({post}) => {

    return (
        <div className='post'>
            <PostTopBar data={{
                name: post.first_name+' '+post.last_name,
                pfp:post.profile_picture,
                timestamp: post.date_posted,
                postID: post.postID,
                userID: post.userID
            }}/>
            <PostMedia data={{
                url:post.url,
                type:post.type
            }}/>
            <PostTextBar post_text={post.post_text}/>
            <PostComments postID={post.postID}/>
            <PostBottomBar data={{
                postID: post.postID,
                userID: post.userID
            }}/>
        </div>
    )
}

export default Post
