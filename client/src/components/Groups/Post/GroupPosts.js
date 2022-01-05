import React, {memo} from 'react'
import GroupPost from './GroupPost'


const Posts = ({posts, refetchPosts, role}) => {
    return (
        <div className='container-posts'>
            {posts.length > 0 && posts.map(post => <GroupPost 
                                                        refetchPosts={refetchPosts} 
                                                        post={post} 
                                                        key={post.postID}
                                                        role={role}
                                                    />)}
        </div>
    )
}

export default memo(Posts)

