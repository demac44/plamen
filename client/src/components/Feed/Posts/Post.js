import React from 'react'
import AddCommLike from './Post components/UI/AddCommLike'
import Comment from './Post components/UI/Comment'
import InfoSave from './Post components/UI/InfoSave'
import PostImg from './Post components/UI/PostImg'
import PostText from './Post components/UI/PostText'


const Post = ({width, post, user, comments, likes}) => {
    return (
        <>
            <div className="post" style={{width:width}}>
                <InfoSave date={post.date_posted} user={user} postID={post.postID}/>
                <PostImg url={post.url}/>
                <PostText content={post.post_text}/>
                {comments.map(comment => <Comment comment={comment} key={comment.commentID}/>)}
                <AddCommLike postID={post.postID} likes={likes}/>
            </div>
        </>
    )
}

export default Post
