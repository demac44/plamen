import React from 'react'

const PostImg = ({url}) => {
    return (
        <div className='feed-post-img'>
            <img src={url}></img>
        </div>
    )
}

export default PostImg
