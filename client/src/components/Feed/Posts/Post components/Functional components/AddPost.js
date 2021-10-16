import React, { useState } from 'react'
import Avatar from '../../../../UI/Avatar'

import '../../../../../App.css'
import '../../../../../General.css'

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!){
        new_textPost(userID: $userID, post_content: $text){
            userID
            post_content
        }
    }
`

const AddPost = ({width}) => {
    const [err, setErr] = useState('1px solid grey')
    const ls = JSON.parse(localStorage.getItem('user'))
    let text;

    const [new_post, {}] = useMutation(NEW_POST)

    const handleSubmit = (e) => {
        e.preventDefault()

        text = text.value

        if(text.trim().length < 1){
            setErr('3px solid #E82c30')
            return
        } else{
            new_post({
                variables: {
                    userID: ls.userID,
                    text: text
                }
            })
            window.location.reload()
        }

    }

    return (
        <form className="add-np-box" style={{width:width}} onSubmit={handleSubmit}>
            <div className="add-np-txt">
                <Avatar height='100%'/>
                <textarea type="text" className="add-np-input" style={{border:err}} ref={value => text = value} placeholder="Add new post..."></textarea>
            </div>
            <div className="add-np-tbtn">
                <div className="add-np-types">
                    <i className="fas fa-images"></i>
                    <p>Image</p>
                    <i className="fas fa-video" style={{marginLeft: "25px"}}></i>
                    <p>Video</p>
                </div>
                <button type='submit' className="fp-cmt-btn">POST</button>
            </div>
        </form>
    )
}

export default AddPost
