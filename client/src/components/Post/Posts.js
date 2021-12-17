import React, {memo} from 'react'
import Post from './Post'

const Posts = ({posts, refetchPosts}) => {
    return (
        <div className='container-posts'>
            {posts.length > 0 && posts.map(post => <Post refetchPosts={refetchPosts} post={post} key={post.postID}/>)}
        </div>
    )
}

export default memo(Posts)

