import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Linkify from 'react-linkify'
import Avatar from '../../../../General components/Avatar'
import SetTime from '../../../../General components/SetTime'

const Comment = ({comment, refetchComments}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [readMore, setReadMore] = useState(true)

    const [delete_comment] = useMutation(DELETE_GP_COMMENT)

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
            <Link to={'/profile/'+comment.username} style={{marginTop:'10px'}}>
                <Avatar size='35px' image={comment.profile_picture}/>
            </Link>

            <div className='cmt-text-box'>
                {comment.comment_text.length>200 ? 
                (
                <>
                    {readMore ? 
                    <p><Link to={'/profile/'+comment.username} className='cmt-username'>{comment.username}</Link>
                                    {' '+comment.comment_text.slice(0, 200)+'. . .'}
                        <span
                            onClick={()=>setReadMore(!readMore)} 
                            className='see-full-cmt-btn'
                        >  Read more
                        </span>
                    </p> 
                    : <p><Link to={'/profile/'+comment.username} className='cmt-username'>{comment.username}</Link>
                        <Linkify>{' '+comment.comment_text}</Linkify>
                        <span
                            onClick={()=>setReadMore(!readMore)} 
                            className='see-full-cmt-btn'
                            > Read less
                        </span>
                      </p>}
                </>
                )
                : <p><Link to={'/profile/'+comment.username} className='cmt-username'>{comment.username}</Link>
                    <Linkify>{' '+comment.comment_text}</Linkify></p>}
                    
                <SetTime timestamp={comment.date_commented} fontSize='12px'/>
            </div>

            {comment.userID===uid && 
                <FontAwesomeIcon 
                    icon='trash-alt' 
                    className='cmt-del-btn'
                    onClick={handleDelete}
                />}
        </div>
    )
}

export default Comment

const DELETE_GP_COMMENT = gql`
    mutation ($cmtID: Int!){
        remove_group_post_comment(commentID: $cmtID){
            commentID
        }
    }

`