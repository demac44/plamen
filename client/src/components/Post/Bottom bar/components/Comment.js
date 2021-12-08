import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Avatar from '../../../General components/Avatar'
import SetTime from '../../../General components/SetTime'

const Comment = ({comment, refetchComments, groupID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [readMore, setReadMore] = useState(true)

    const [delete_comment] = useMutation(groupID ? DELETE_GP_COMMENT : DELETE_COMMENT)


    const handleDelete = () => {
        delete_comment({
            variables:{
                cmtID: comment.commentID,
                senderID: ls.userID,
                postID: comment.postID
            }
        }).then(()=>refetchComments())
    }

    return (
        <div className='comment'>
            <div className='flex-sb'>
                <Link to={'/profile/'+comment.userID} className='flex-ctr'>
                    <Avatar size='35px' image={comment.profile_picture}/>

                    <span className='flex-col-sb' style={styles.nameAndTime}>
                        <p style={styles.name}>{comment.username}</p>
                        <SetTime timestamp={comment.date_commented}/>
                    </span>
                </Link>
                {comment.userID===ls.userID && 
                    <i 
                        style={styles.deleteBtn} 
                        className='fas fa-trash-alt'
                        onClick={handleDelete}
                    ></i>}
            </div>
            <div style={styles.textField}>
                {comment.comment_text.length>200 ? 
                (
                <>
                    {readMore ? <p>{comment.comment_text.slice(0, 200)}. . .</p> : <p>{comment.comment_text}</p>}
                    <br/>
                    <p 
                        onClick={()=>setReadMore(!readMore)} 
                        style={{fontSize:'12px', color:'teal', cursor:'pointer'}}
                    >
                        {readMore ? 'Read more' : 'Read less'}
                    </p>
                </>
                )
                : <p>{comment.comment_text}</p>
                }
            </div>
        </div>
    )
}

export default Comment

const styles = {
    name:{
        fontSize:'14px'
    },
    nameAndTime:{
        height:'100%',
        marginLeft:'10px',
        color:'white'
    },
    textField:{
        width:'100%',
        color:'white',
        padding:'5px 10px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        wordWrap:'break-word',
        marginTop:'5px',
        fontSize:'14px'
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

const DELETE_GP_COMMENT = gql`
    mutation ($cmtID: Int!){
        remove_group_post_comment(commentID: $cmtID){
            commentID
        }
    }

`