import React, { useState } from 'react'
import './style.css'

const PostTextBar = ({post_text}) => {
    const [readMore, setReadMore] = useState(true)

    return (
        <>
            {post_text.length > 0 &&
                <div className='post-text-bar'>
                    {post_text.length > 200 
                    ? 
                    (
                    <>
                        {readMore ? 
                        <p>{post_text.slice(0,300)}
                            <span onClick={()=>setReadMore(false)} className='read-full-post'>. . . Read more</span>
                        </p> : <p>{post_text}</p>}

                        <br/>

                        {!readMore && <p onClick={()=>setReadMore(true)} className='read-full-post'>Read less</p>}
                    </>
                    )
                    : <p>{post_text}</p>
                    }
                </div>}
        </>
    )
}
export default PostTextBar