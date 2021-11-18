import React from 'react'

const PostText = ({post_text}) => {
    return (
        <>
        {post_text.length > 0 &&
        <div className="post-text">
            <p>
                {post_text}
            </p>
        </div>}
        </>
    )
}

export default PostText
