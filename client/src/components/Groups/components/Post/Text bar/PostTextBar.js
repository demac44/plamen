import React, { useState } from 'react'
import './style.css'
import Linkify from 'react-linkify'

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
                        <Linkify><p>{post_text.slice(0,300)}
                            <span onClick={()=>setReadMore(false)} className='read-full-post'>. . . Read more</span>
                        </p></Linkify> : <Linkify><p>{post_text}</p></Linkify>}

                        <br/>

                        {!readMore && <p onClick={()=>setReadMore(true)} className='read-full-post'>Read less</p>}
                    </>
                    )
                    : <Linkify><p>{post_text}</p></Linkify>
                    }
                </div>}
        </>
    )
}
export default PostTextBar