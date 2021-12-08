import React from 'react'

import PostTopBar from './Top bar/PostTopBar'
import PostMedia from './Media/PostMedia'
import PostTextBar from './Text bar/PostTextBar'
import PostComments from './Bottom bar/components/PostComments'
import PostBottomBar from './Bottom bar/PostBottomBar'

import './Post.css'

const Post = ({post, refetchPosts}) => {
    return (
        <div className='post'>
            <PostTopBar 
                refetchPosts={refetchPosts}
                data={{
                    name: post.first_name+' '+post.last_name,
                    pfp:post.profile_picture,
                    timestamp: post.date_posted,
                    postID: post.postID,
                    userID: post.userID,
                    groupID: post?.groupID
            }}/>
            <PostMedia data={{
                url:post.url,
                type:post.type
            }}/>
            <PostTextBar post_text={post.post_text}/>
            <PostBottomBar postID={post.postID} userID={post.userID} groupID={post?.groupID}/>
        </div>
    )
}

export default Post
