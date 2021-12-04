import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import LoginPopUp from '../../../../Entry/Login/LoginPopUp'

const ADD_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!, $rid: Int!){
        add_comment(postID: $postID, userID: $userID, comment_text: $comment_text){
            postID
        }
        comment_notification (postID: $postID, sender_id: $userID, receiver_id: $rid){
            postID
        }
    }
`
const ADD_GP_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!){
        comment_gp (postID: $postID, userID: $userID, comment_text: $comment_text){
            postID
        }
    }
`

const AddComment = ({postID, updatedCallback, isLogged, uid, groupPost}) => {
    let comment_text;
    const user = JSON.parse(localStorage.getItem('user'))
    const [added, setAdded] = useState(false)
    const [loginPopUp, setLoginPopUp] = useState(false)
    const [add_comment] = useMutation(groupPost ? ADD_GP_COMMENT : ADD_COMMENT) 

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
                    comment_text: comment_text,
                    rid: uid
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
