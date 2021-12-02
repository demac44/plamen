import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddCommLike from './Post components/UI/AddCommLike'
import Comment from './Post components/UI/Comment'
import InfoSave from './Post components/UI/InfoSave'
import PostImg from './Post components/UI/PostImg'
import PostText from './Post components/UI/PostText'

const Post = ({post, user, comments, likes, updatedCallback}) => {
    const isLogged = useSelector(state => state?.isAuth.isAuth)
    const [showAll, setShowAll] = useState(false)
    const handleShowComm = () => {
        setShowAll(!showAll)
    }
    return (
        <>
            <div className="post">
                <InfoSave date={post.date_posted} user={user} postID={post.postID} updatedCallback={updatedCallback} isLogged={isLogged}/>
                <PostImg url={post.url} type={post.type}/>
                <PostText post_text={post.post_text}/>
                {comments.length > 0 &&
                <div style={{height:showAll ? 'auto':'50px', overflow:'hidden'}}>
                    {comments.map(comment => <Comment comment={comment} key={comment.commentID} uid={user.userID}/>)}
                </div>}
                {comments.length > 1 && <p 
                style={styles.showMorebtn}
                onClick={handleShowComm}
                >{showAll ? 'Show less' : 'Show more'}</p>}
                <AddCommLike postID={post.postID} uid={user.userID} likes={likes} updatedCallback={updatedCallback} isLogged={isLogged}/>
            </div>
        </>
    )
}

export default Post

const styles = {
    showMorebtn: {
        padding:'5px',
        width:'100%', 
        textAlign:'center', 
        cursor:'pointer',
        backgroundColor:'#1f1f1f',
        color: 'white',
        fontSize:'14px'
    }
}