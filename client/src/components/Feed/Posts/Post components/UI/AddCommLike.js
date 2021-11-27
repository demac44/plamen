import React from 'react'
import AddComment from '../Functional components/AddComment'
import LikePost from '../Functional components/LikePost'

const AddCommLike = ({postID, likes, updatedCallback, isLogged, uid}) => {        
    return (
        <div className="fp-add-comment flex-ctr">
            <LikePost postID={postID} likes={likes} isLogged={isLogged} uid={uid}/> 
            <AddComment postID={postID} updatedCallback={updatedCallback} isLogged={isLogged} uid={uid}/>
        </div>
    )
}

export default AddCommLike
