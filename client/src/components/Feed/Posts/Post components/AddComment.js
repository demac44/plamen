import React from 'react'
import Avatar from '../../../UI/Avatar'
import CommentBtn from './Functional components/CommentBtn'
import CommentInput from './Functional components/CommentInput'

const AddComment = () => {
    return (
        <div className="fp-add-comment">
            <Avatar height='100%'/>
            <CommentInput/>
            <CommentBtn/>
        </div>
    )
}

export default AddComment
