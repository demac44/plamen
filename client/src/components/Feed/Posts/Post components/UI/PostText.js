import React, {useEffect,useState} from 'react'

const PostText = ({post_text}) => {
    return (
        <div className="post-text">
            {[...post_text].map(s => s==="\n" ? <br key={Math.random()}/> : <span key={Math.random()}>{s}</span> )}
        </div>
    )
}

export default PostText
