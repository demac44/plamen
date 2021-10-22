import React, { useEffect, useState } from 'react'
import AddComment from '../Functional components/AddComment'
import LikePost from '../Functional components/LikePost'

const AddCommLike = ({postID}) => {        
    return (
        <div className="fp-add-comment flex-ctr">
            <LikePost postID={postID}/> 
            <AddComment postID={postID}/>
        </div>
    )
}

export default AddCommLike
