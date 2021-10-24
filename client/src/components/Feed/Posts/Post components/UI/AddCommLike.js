import React from 'react'
import AddComment from '../Functional components/AddComment'
import LikePost from '../Functional components/LikePost'

const AddCommLike = ({postID, likes, callback}) => {        
    return (
        <div className="fp-add-comment flex-ctr">
            <LikePost postID={postID} likes={likes}/> 
            <AddComment postID={postID} callback={callback}/>
        </div>
    )
}

export default AddCommLike
