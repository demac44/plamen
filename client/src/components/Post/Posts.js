import React from 'react'
import Post from './Post'

const Posts = ({posts}) => {
    return (
        <div className='container-posts'>
            {posts.length > 0 && posts.map(post => <Post post={post} key={post.postID}/>)}
        </div>
    )
}

export default Posts

