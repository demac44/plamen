import React from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'

const REMOVE_COMMENT = gql`
    mutation ($cid: Int!, $sid: Int!, $postID:Int!){
        remove_comment(commentID: $cid){
            commentID
        }
        remove_comment_notif(sender_id: $sid, postID: $postID){
            postID
        }
    }
`

const CommentOpt = ({cid, postID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [remove_comment] = useMutation(REMOVE_COMMENT)


    const handleRemove = () => {
        remove_comment({
            variables:{
                cid,
                sid: ls.userID,
                postID
            }
        })
    }

    return (
        <div className='cmt-opt-menu'>
            <ul>
                <li onClick={handleRemove}>REMOVE</li>
            </ul>
        </div>
    )
}

export default CommentOpt
