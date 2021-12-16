import React, { memo } from 'react'

import PostTopBar from './Top bar/PostTopBar'
import PostMedia from './Media/PostMedia'
import PostTextBar from './Text bar/PostTextBar'
import PostBottomBar from './Bottom bar/PostBottomBar'

import { useSelector } from 'react-redux'

import './Post.css'

const Post = ({post, refetchPosts}) => {
    const isLogged = useSelector(state => state?.isAuth.isAuth)

    return (
        <div className='post'>
            <PostTopBar 
                isLogged={isLogged}
                refetchPosts={refetchPosts}
                data={{
                    name: post.first_name+' '+post.last_name,
                    pfp:post.profile_picture,
                    timestamp: post.date_posted,
                    postID: post.postID,
                    userID: post.userID,
                    username: post.username
            }}/>
            <PostMedia data={{
                url:post.url,
                type:post.type
            }}/>
            <PostTextBar post_text={post.post_text}/>
            <PostBottomBar postID={post.postID} userID={post.userID} isLogged={isLogged}/>
        </div>
    )
}

export default memo(Post)
