import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Avatar from '../../../General components/Avatar'
import SetTime from '../../../General components/SetTime'
import Linkify from 'react-linkify'

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
            <Link to={'/profile/'+comment.username} style={{marginTop:'10px'}}>
                <Avatar size='35px' image={comment.profile_picture}/>
            </Link>

            <div className='cmt-text-box'>
                {/* if comment too long slice and show read more btn */}
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
                : <div className='flex'><Link to={'/profile/'+comment.username} className='cmt-username'>{comment.username}</Link>
                    {findTag(comment.comment_text) ? <Linkify>{<p dangerouslySetInnerHTML={{__html: findTag(comment.comment_text)}}></p>}</Linkify>
                        : <Linkify>{comment.comment_text}</Linkify>}
                 </div>}
                    
                <SetTime timestamp={comment.date_commented} fontSize='12px'/>
            </div>

            {comment.userID===uid && 
                <i 
                    className='fas fa-trash-alt cmt-del-btn'
                    onClick={handleDelete}
                />}
        </div>
    )
}

export default Comment

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

// find if user @mentions in comment
const findTag = (post_text) => {
    if(post_text.includes('@')){
        post_text = post_text.replaceAll('@', ' @') // if user puts no space between tags are not rendered correctly
        if(post_text.includes('<')){
            post_text = post_text.replaceAll('<', '<\u200b') // zero width char to prevent xss
        }
        let arr = post_text.split('')
        let namesArr = [];
        let name=null;
        for(let i = 0;i<arr.length;i++){ // finding all mentioned usernames
            name=null;
            if(arr[i]==='@'){
                for(let j=i;j<arr.length;j++){
                    if(arr[j]===' ') {name=post_text.slice(i+1,j); break}
                    else if(j===arr.length-1) {name=post_text.slice(i+1,j+1); break}
                    else if(j===arr.length) {name=post_text.slice(i+1,-1); break}
                }
                name && namesArr.push(name)
            }
        }
        if(namesArr.length>0){
            namesArr.forEach(name => {
                post_text = post_text.replaceAll(`@${name}`, `<a href='/profile/${name}'>@${name}</a>`)
            })
            return post_text
        }
        return false
    }
    return false
}