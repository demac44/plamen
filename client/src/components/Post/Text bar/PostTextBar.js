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
                            <span onClick={()=>setReadMore(false)} className='read-full-post-btn'>. . . Read more</span>
                        </p></Linkify> : <Linkify><p>{post_text}</p></Linkify>}

                        <br/>

                        {!readMore && <span onClick={()=>setReadMore(true)} className='read-full-post-btn'>Read less</span>}
                    </>
                    )
                    : <Linkify>{<p dangerouslySetInnerHTML={{__html: findTag(post_text)}}></p>}</Linkify>
                    }
                </div>}
        </>
    )
}
export default PostTextBar

// find if user @mentions in post
const findTag = (post_text) => {
    if(post_text.includes('@')){
        let arr = post_text.split('')
        let namesArr = [];
        for(let i = 0;i<arr.length;i++){ // find all mentioned users
            let name=null;
            if(arr[i]==='@'){
                for(let j=i;j<arr.length;j++){
                    if(arr[j]===' ') {name=post_text.slice(i+1,j); break}
                    else if(j===arr.length-1) {name=post_text.slice(i+1,j+1); break}
                    else if(j===arr.length) {name=post_text.slice(i+1,-1); break}
                }
                name && namesArr.push(name)
            }
        }
        if(namesArr.length>0){
            namesArr.forEach(name => {
                post_text = post_text.replaceAll(`@${name}`, `<a href='/profile/${name}'>@${name}</a>`)
            })
            return post_text
        }
        return post_text
    }
    return post_text
}