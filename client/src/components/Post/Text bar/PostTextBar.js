import React, { useState } from 'react'

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
                        {readMore ? <p>{post_text.slice(0,300)}. . .</p> : <p>{post_text}</p>}
                        <br/>
                        <p onClick={()=>setReadMore(!readMore)} style={styles.readMore}>Read more</p>
                    </>
                    )
                    : <p>{post_text}</p>
                    }
                </div>}
        </>
    )
}

export default PostTextBar


const styles = {
    readMore:{
        color:'teal',
        fontSize:'14px',
        cursor:'pointer'
    }
}