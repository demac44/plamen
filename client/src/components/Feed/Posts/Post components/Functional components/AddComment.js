import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const ADD_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!){
        add_comment(postID: $postID, userID: $userID, comment_text: $comment_text){
            commentID
        }
    }
`


const AddComment = ({postID}) => {
    let comment_text;
    const user = JSON.parse(localStorage.getItem('user'))


    const [add_comment] = useMutation(ADD_COMMENT) 


    const handleAddComment = () => {
        comment_text = comment_text.value

        add_comment({
            variables:{
                postID: postID,
                userID: user.userID,
                comment_text: comment_text
            }
        }).then(()=>console.log('added'))
    }

    return (
        <>
            <input ref={value => comment_text = value} id='comment_text'type="text" placeholder="Add comment..."/>
            <button className="fp-cmt-btn" onClick={handleAddComment}>POST</button>
        </>
    )
}

export default AddComment
