import React, { useEffect, useState } from 'react'

const PostImg = ({url}) => {
    const [type, setType] = useState('')


    useEffect(()=>{
        let t = url.slice(36, 41)
        setType(t)
    }, [url])


    return (
        <div className='feed-post-img'>
            {type==='image' && <img src={url} alt=""/>}
            {type==='video' && 
                <video src={url} controls style={{width:'100%'}}/>}
        </div>
    )
}

export default PostImg
