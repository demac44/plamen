import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Avatar from '../../../General components/Avatar'
import SetTime from '../../../General components/SetTime'

const Comment = ({comment, refetch}) => {
    const ls = JSON.parse(localStorage.getItem('user'))

    const [delete_comment] = useMutation(DELETE_COMMENT)


    const handleDelete = () => {
        delete_comment({
            variables:{
                cmtID: comment.commentID,
                senderID: ls.userID,
                postID: comment.postID
            }
        }).then(()=>refetch())
    }

    return (
        <div className='comment flex-sb'>
            <Link to={'/profile/'+comment.userID} className='flex'>
                <Avatar size='40px' image={comment.profile_picture}/>

                <span className='flex-col-sb' style={styles.nameAndTime}>
                    <p style={styles.name}>{comment.username}</p>
                    <SetTime timestamp={comment.date_commented}/>
                </span>
            </Link>
            <div style={styles.textField}>
                <p>{comment.comment_text}</p>
            </div>
            {comment.userID===ls.userID && 
                <i 
                    style={styles.deleteBtn} 
                    className='fas fa-trash-alt'
                    onClick={handleDelete}
                ></i>}
        </div>
    )
}

export default Comment

const styles = {
    name:{
        fontSize:'16px'
    },
    nameAndTime:{
        height:'100%',
        marginLeft:'10px',
        color:'white'
    },
    textField:{
        width:'100%',
        color:'white',
        padding:'5px 10px'
    },
    deleteBtn:{
        fontSize:'15px',
        color:'white',
        marginRight:'15px',
        cursor:'pointer'
    }
}

const DELETE_COMMENT = gql`
    mutation ($cmtID: Int!, $senderID: Int!, $postID:Int!){
        delete_comment(commentID: $cmtID){
            commentID
        }
        remove_comment_notif(sender_id: $senderID, postID: $postID){
            postID
        }
    }
`