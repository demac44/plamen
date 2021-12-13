import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Avatar from '../../../General components/Avatar'
import SetTime from '../../../General components/SetTime'

import { useSelector } from 'react-redux'
import LoginPopUp from '../../../Entry/Login/LoginPopUp'

const Comment = ({comment, refetchComments}) => {
    const [loginPopUp, setLoginPopUp] = useState(false)
    const isLogged = useSelector(state => state?.isAuth.isAuth)
    const ls = JSON.parse(localStorage.getItem('user'))
    const [readMore, setReadMore] = useState(true)

    const [delete_comment] = useMutation(DELETE_COMMENT)


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
        <>
            <div className='comment'>
                <div className='flex-sb'>
                    <Link to={'/profile/'+comment.username} className='flex-ctr'>
                        <Avatar size='35px' image={comment.profile_picture}/>

                        <span className='flex-col-sb' style={styles.nameAndTime}>
                            <p style={styles.name}>{comment.username}</p>
                            <SetTime timestamp={comment.date_commented}/>
                        </span>
                    </Link>
                    {isLogged && (comment.userID===ls.userID && 
                        <i 
                            style={styles.deleteBtn} 
                            className='fas fa-trash-alt'
                            onClick={handleDelete}
                        ></i>)}
                </div>
                <div style={styles.textField}>
                    {comment.comment_text.length>200 ? 
                    (
                    <>
                        {readMore ? <p>{comment.comment_text.slice(0, 200)}<span
                            onClick={()=>isLogged ? setReadMore(false) : setLoginPopUp(true)} 
                            style={styles.seeMore}
                        > . . . Read more</span></p> : <p>{comment.comment_text}</p>}
                        <br/>
                        {!readMore && <p 
                            onClick={()=>isLogged ? setReadMore(true) : setLoginPopUp(true)} 
                            style={styles.seeMore}
                        >Read less</p>}
                    </>
                    )
                    : <p>{comment.comment_text}</p>
                    }
                </div>
            </div>
            {loginPopUp && <LoginPopUp/>}
        </>
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