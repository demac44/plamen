import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const StoryReply = ({userID, storyID, type, receiver}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const usernm= useSelector(state => state?.isAuth?.user?.username)
    const user = JSON.parse(localStorage.getItem('user'))
    const [replyText, setReplyText] = useState('')
    const [reply] = useMutation(STORY_REPLY)
    
    const handleReply = () => {
        reply({
            variables:{
                sender: usernm,
                receiver,
                pfp: user.profile_picture || '',
                sid: storyID,
                text: replyText,
                type
            }
        })
    }

    return (
        <div className='story-bottom-bar flex-ctr'>
            <input 
                type='text' 
                className='input story-reply-input' 
                disabled={userID===uid}
                placeholder='Reply to story...'
                value={replyText}
                onChange={(e)=>setReplyText(e.target.value)}
            />


            <button className='s-reply-btn btn' disabled={userID===uid} onClick={handleReply}>REPLY</button>
        </div>
    )
}

export default StoryReply

const STORY_REPLY = gql`
    mutation ($sender: String!, $receiver: String!, $sid: Int!, $text: String!, $pfp: String!, $type: String!){
        reply_to_story(sender: $sender, receiver: $receiver, storyID: $sid, msg_text: $text, profile_picture: $pfp, type: $type){
            storyID
        }
    }
`