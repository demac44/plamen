import React, { memo } from 'react'
import './style.css'
const PostMedia = ({type, url}) => {
    return (
        <div className='post-media-box flex-ctr'>
            {type==='image' ? <img loading='lazy' src={url} className='post-img' alt=""/>
             : (type==='video' && <video controls src={url}/>)}
        </div>
    )
}
export default memo(PostMedia)