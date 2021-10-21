import React, { useEffect, useState } from 'react'
import Comment from '../Functional components/Comment'
import LikePost from '../Functional components/LikePost'

const AddCommLike = ({postID}) => {        
    return (
        <div className="fp-add-comment flex-ctr">
            <LikePost postID={postID}/> 
            <Comment/>
        </div>
    )
}

export default AddCommLike
