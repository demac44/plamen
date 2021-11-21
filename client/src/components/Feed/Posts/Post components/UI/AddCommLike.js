import React from 'react'
import AddComment from '../Functional components/AddComment'
import LikePost from '../Functional components/LikePost'

const AddCommLike = ({postID, likes, updatedCallback, isLogged}) => {        
    return (
        <div className="fp-add-comment flex-ctr">
            <LikePost postID={postID} likes={likes} isLogged={isLogged}/> 
            <AddComment postID={postID} updatedCallback={updatedCallback} isLogged={isLogged}/>
        </div>
    )
}

export default AddCommLike
