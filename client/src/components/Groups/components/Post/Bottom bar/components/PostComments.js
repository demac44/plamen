import React from 'react'
import Comment from './Comment'

const PostComments = ({comments, seeMore, refetchComments}) => {
    return (
        <div className='post-comments-box'>
            {comments.map(comment => <Comment 
                                        comment={comment} 
                                        key={comment.commentID} 
                                        refetchComments={refetchComments}
                                    />)}
            {comments.length > 0 && 
                <div onClick={()=>seeMore()} className='flex-ctr wh-100'><p className='load-more-cmt-btn flex-ctr'>Load more</p></div>}
        </div>
    )
}
export default PostComments