import React from 'react'

const PostTextBar = ({post_text}) => {
    return (
        <>
            {post_text.length > 0 &&
                <div className='post-text-bar'>
                    <p>{post_text}</p>
                </div>}
        </>
    )
}

export default PostTextBar
