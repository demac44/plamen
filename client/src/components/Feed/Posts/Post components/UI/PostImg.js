import React from 'react'

const PostImg = ({url, type}) => {
    return (
        <div className='feed-post-img'>
            {type==='image' && <img src={url} alt=""/>}
            {type==='video' && 
                <video src={url} controls style={{width:'100%'}}/>}
        </div>
    )
}

export default PostImg
