import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import LoginPopUp from '../../../../Entry/Login/LoginPopUp'

const ADD_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!){
        add_comment(postID: $postID, userID: $userID, comment_text: $comment_text){
            commentID
        }
    }
`


const AddComment = ({postID, updatedCallback, isLogged}) => {
    let comment_text;
    const user = JSON.parse(localStorage.getItem('user'))
    const [added, setAdded] = useState(false)
    const [loginPopUp, setLoginPopUp] = useState(false)

    const [add_comment] = useMutation(ADD_COMMENT) 

    useEffect(()=>{
        updatedCallback(added)
    },[updatedCallback, added])

    const handleAddComment = (e) => {
        e.preventDefault()
        comment_text = e.target.comment_text.value

        if(!isLogged) {
            setLoginPopUp(true)
            return
        }
        else if(comment_text.trim()===''){
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
        <>
        <form style={{display: 'flex', width:'100%', height:'100%'}} onSubmit={handleAddComment}>
            <input id='comment_text' name='comment_text' type="text" placeholder="Add comment..."/>
            <button className="fp-cmt-btn">POST</button>
        </form>
        {loginPopUp && <LoginPopUp/>}
        </>
    )
}

export default AddComment
