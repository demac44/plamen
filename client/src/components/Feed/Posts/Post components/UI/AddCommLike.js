import React from 'react'
import AddComment from '../Functional components/AddComment'
import LikePost from '../Functional components/LikePost'

const AddCommLike = ({postID, likes, updatedCallback, isLogged, uid, groupPost}) => {        
    return (
        <div className="fp-add-comment flex-ctr">
            <LikePost postID={postID} likes={likes} isLogged={isLogged} uid={uid} groupPost={groupPost}/> 
            <AddComment postID={postID} updatedCallback={updatedCallback} isLogged={isLogged} uid={uid} groupPost={groupPost}/>
        </div>
    )
}

export default AddCommLike
