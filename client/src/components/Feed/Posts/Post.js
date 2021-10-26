import React, { useState } from 'react'
import AddCommLike from './Post components/UI/AddCommLike'
import Comment from './Post components/UI/Comment'
import InfoSave from './Post components/UI/InfoSave'
import PostImg from './Post components/UI/PostImg'
import PostText from './Post components/UI/PostText'


const Post = ({width, post, user, comments, likes, callback}) => {
    const [showAll, setShowAll] = useState(false)

    const handleShowComm = () => {
        setShowAll(!showAll)
    }

    return (
        <>
            <div className="post" style={{width:width}}>
                <InfoSave date={post.date_posted} user={user} postID={post.postID} callback={callback}/>
                <PostImg url={post.url}/>
                <PostText post_text={post.post_text}/>
                {comments.length > 0 &&
                <div style={{height:showAll ? 'auto':'50px', overflow:'hidden'}}>
                    {comments.map(comment => <Comment comment={comment} key={comment.commentID}/>)}
                </div>}
                {comments.length > 1 && <p 
                style={{
                    padding:'5px',
                    width:'100%', 
                    textAlign:'center', 
                    cursor:'pointer',
                    backgroundColor:'#ccc',
                    color:'#2f2f2f'
                }}
                onClick={handleShowComm}
                >{showAll ? 'Show less' : 'Show more'}</p>}
                <AddCommLike postID={post.postID} likes={likes} callback={callback}/>
            </div>
        </>
    )
}

export default Post
