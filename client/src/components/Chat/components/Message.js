import React, { useCallback, useState, memo } from 'react'

import { gql } from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { OpenMedia } from '../export'
import { useSelector } from 'react-redux';
import MsgCurrentUser from './Messages/MsgCurrentUser'
import MsgOtherUser from './Messages/MsgOtherUser'

const Message = ({msg}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [openMedia, setOpenMedia] = useState(false)
    const {data, loading} = useQuery(GET_STORY, {
        skip: !msg.storyID,
        variables: {
            sid: msg.storyID
        }
    })

    const setOpenMediaCallback = useCallback(val => {
        setOpenMedia(val)
    }, [setOpenMedia])
    
    return (
        <>
            {msg.userID===uid 
            ? <MsgCurrentUser msg={msg} storyUrl={data?.get_story_msg_url?.url} uid={uid} setOpenMedia={setOpenMediaCallback}/>
            : <MsgOtherUser msg={msg} storyUrl={data?.get_story_msg_url?.url} setOpenMedia={setOpenMediaCallback}/>}
            {openMedia && <OpenMedia url={msg.url} callback={setOpenMediaCallback}/>}    
        </>
    )
}



export default memo(Message)

const GET_STORY = gql`
    query($sid: Int){
        get_story_msg_url(storyID: $sid){
            url
        }
    }
`