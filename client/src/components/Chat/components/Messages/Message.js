import React, { useCallback, useState, memo } from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';
import MsgCurrentUser from './MsgCurrentUser'
import MsgOtherUser from './MsgOtherUser'
import OpenMedia from '../Chat media/OpenMedia'

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
            {!loading && ((msg.userID===uid)
            ? <MsgCurrentUser
                msg={msg} 
                storyUrl={data?.get_story_msg_url?.url} // if message is story reply
                uid={uid}
                setOpenMedia={setOpenMediaCallback}
                deleteQuery={DELETE_MESSAGE}
            />
            : <MsgOtherUser msg={msg} storyUrl={data?.get_story_msg_url?.url} setOpenMedia={setOpenMediaCallback}/>)}
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

const DELETE_MESSAGE = gql`
    mutation ($msgID: Int!){
        delete_message(msgID:$msgID){
            msgID
        }
    }
`