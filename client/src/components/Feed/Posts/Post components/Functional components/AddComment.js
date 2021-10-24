import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const ADD_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!){
        add_comment(postID: $postID, userID: $userID, comment_text: $comment_text){
            commentID
        }
    }
`


const AddComment = ({postID, callback}) => {
    let comment_text;
    const user = JSON.parse(localStorage.getItem('user'))
    const [added, setAdded] = useState(false)

    const [add_comment] = useMutation(ADD_COMMENT) 

    useEffect(()=>{
        callback(added)
    },[callback, added])


    const handleAddComment = (e) => {
        e.preventDefault()
        comment_text = e.target.comment_text.value

        if(comment_text.trim()===''){
            console.log('empty');
        } else{
            add_comment({
                variables:{
                    postID: postID,
                    userID: user.userID,
                    comment_text: comment_text
                }
            }).then(()=>{
                e.target.comment_text.value=''
                setAdded(true)
            })
        }
    }

    return (
        <form style={{display: 'flex', width:'100%', height:'100%'}} onSubmit={handleAddComment}>
            <input id='comment_text' name='comment_text' type="text" placeholder="Add comment..."/>
            <button className="fp-cmt-btn">POST</button>
        </form>
    )
}

export default AddComment
