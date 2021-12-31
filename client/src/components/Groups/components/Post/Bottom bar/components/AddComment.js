import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { useSelector } from 'react-redux';

const AddComment = ({postID, userID, refetchComments}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [add_comment] = useMutation(ADD_GP_COMMENT) 

    const handleAddComment = (e) => {
        e.preventDefault()
        const comment_text = e.target.comment_text.value

        if(comment_text.trim()===''){
            console.log('empty');
        } else{
            add_comment({
                variables:{
                    postID: postID,
                    userID: uid,
                    comment_text: comment_text,
                    rid: userID,
                }
            }).then(()=>{
                refetchComments()
                e.target.comment_text.value=''
            })
        }
    }

    return (
        <form className='flex-ac wh-100' onSubmit={handleAddComment}>
            <textarea className='add-cmt-textarea wh-100 input' id='comment_text' name='comment_text' type="text" placeholder="Add comment..."/>
            <button className='post-button btn'>POST</button>
        </form>
    )
}

export default AddComment

const ADD_GP_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!){
        comment_group_post (postID: $postID, userID: $userID, comment_text: $comment_text){
            postID
        }
    }
`