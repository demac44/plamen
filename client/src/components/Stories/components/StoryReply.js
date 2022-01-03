import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import {gql} from 'graphql-tag'
import {useMutation, useQuery} from 'react-apollo'

const StoryReply = ({userID, storyID, type}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const usernm= useSelector(state => state?.isAuth?.user?.username)
    const user = JSON.parse(localStorage.getItem('user'))
    const [replyText, setReplyText] = useState('')
    const [reply] = useMutation(STORY_REPLY)
    const [create_chat] = useMutation(CREATE_CHAT)
    const {data, loading} = useQuery(CHAT_EXISTS, {variables: {user1:uid, user2:userID}}) 
    
    const handleReply = () => {
        if(data?.chat_exists?.chatID){
            reply({
                variables:{
                    uid,
                    username: usernm,
                    pfp: user.profile_picture || '',
                    sid: storyID,
                    text: replyText,
                    cid: data?.chat_exists?.chatID,
                    type
                }
            })
        } else {
            create_chat({
                variables: { 
                    user1: uid,
                    user2: userID
                }
            }).then((res)=>{
                reply({
                    variables:{
                        uid,
                        username: usernm,
                        pfp: user.profile_picture || '',
                        sid: storyID,
                        text: replyText,
                        cid: res?.data?.create_chat?.chatID,
                        type
                    }
                    })
                })
            }}

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


            <button className='btn' disabled={userID===uid} onClick={handleReply}>REPLY</button>
        </div>
    )
}

export default StoryReply

const STORY_REPLY = gql`
    mutation ($uid: Int!, $cid: Int!, $sid: Int!, $text: String!, $username: String!, $pfp: String!, $type: String!){
        reply_to_story(userID: $uid, chatID: $cid, storyID: $sid, msg_text: $text, username: $username, profile_picture: $pfp, type: $type){
            storyID
        }
    }
`
const CREATE_CHAT = gql`
    mutation ($user1: Int!, $user2: Int!){
        create_chat(user1_ID: $user1, user2_ID: $user2){
            chatID
        }
    }
`
const CHAT_EXISTS = gql`
    query ($user1:Int!,$user2:Int){
        chat_exists (user1_ID:$user1, user2_ID:$user2){ 
            chatID
        }
    }
`