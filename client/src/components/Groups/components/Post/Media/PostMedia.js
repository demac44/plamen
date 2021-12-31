import React, { useState } from 'react'
import './style.css'
const PostMedia = ({data}) => {
    const [loading, setLoading] = useState(true)

    return (
        <div className='post-media-box flex-ctr'>
            {data.type==='image' && (
                <>
                {loading && <div className='flex-ctr post-media-loader' ><div className='small-spinner'></div></div>}
                <img onLoad={()=>setLoading(false)} src={data.url} alt=""/>
                </>
            )}
            {data.type==='video' && <video controls src={data.url}/>}
        </div>
    )
}
export default PostMedia