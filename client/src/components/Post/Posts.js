import React, {memo, lazy, Suspense} from 'react'
import Post from './Post'

// const Post = lazy(() => import('./Post'))

const Posts = ({posts, refetchPosts}) => {
    return (
        <div className='container-posts'>
            {/* <Suspense fallback={<div>loading...</div>}> */}
                {posts.length > 0 && posts.map(post => <Post refetchPosts={refetchPosts} post={post} key={post.postID}/>)}
            {/* </Suspense> */}
        </div>
    )
}

export default memo(Posts)

