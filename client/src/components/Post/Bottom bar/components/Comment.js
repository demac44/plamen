import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux';
import Avatar from '../../../General components/Avatar'
import SetTime from '../../../General components/SetTime'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const Comment = ({comment, refetchComments}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [readMore, setReadMore] = useState(true)

    const [delete_comment] = useMutation(DELETE_COMMENT)


    const handleDelete = () => {
        delete_comment({
            variables:{
                cmtID: comment.commentID,
                senderID: uid,
                postID: comment.postID
            }
        }).then(()=>refetchComments())
    }

    return (
        <div className='comment flex'>
            <Link to={'/profile/'+comment.username} style={{marginTop:'5px'}}>
                <Avatar size='35px' image={comment.profile_picture}/>
            </Link>
            <div style={styles.textField}>
                {comment.comment_text.length>200 ? 
                (
                <>
                    {readMore ? <p><strong>{comment.username}</strong>{' '+comment.comment_text.slice(0, 200)+'. . .'}
                    <span
                        onClick={()=>setReadMore(!readMore)} 
                        style={styles.seeMore}
                    >  Read more</span></p> 
                    : <p><strong>{comment.username}</strong>{' '+comment.comment_text}
                    <span
                        onClick={()=>setReadMore(!readMore)} 
                        style={styles.seeMore}
                > Read less</span></p>}
                </>
                )
                : <p><strong>{comment.username}</strong>{' '+comment.comment_text}</p>}
                <SetTime timestamp={comment.date_commented} fontSize='12px'/>
            </div>
            {comment.userID===uid && 
                <FontAwesomeIcon 
                    icon='trash-alt' 
                    style={styles.deleteBtn} 
                    className='fas fa-trash-alt'
                    onClick={handleDelete}
                />}
        </div>
    )
}

export default Comment

const styles = {
    name:{
        fontSize:'14px'
    },
    textField:{
        width:'100%',
        color:'white',
        padding:'5px 10px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        wordWrap:'break-word',
        margin:'5px 10px 0 5px',
        fontSize:'14px'
    },
    deleteBtn:{
        fontSize:'13px',
        color:'white',
        cursor:'pointer',
        marginTop:'10px'
    },
    seeMore:{
        fontSize:'12px', 
        color:'teal', 
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