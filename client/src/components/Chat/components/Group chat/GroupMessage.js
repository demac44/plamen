import React, { useCallback, useState, memo } from 'react'
import { gql } from 'graphql-tag'
import { useSelector } from 'react-redux';
import {OpenMedia} from '../../export'
import MsgCurrentUser from '../Messages/MsgCurrentUser'
import MsgOtherUser from '../Messages/MsgOtherUser'

const GroupMessage = ({msg}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [openMedia, setOpenMedia] = useState(false)

    const setOpenMediaCallback = useCallback(val => {
        setOpenMedia(val)
    }, [setOpenMedia])
    
    return (
        <>
            {(msg.userID===uid)
            ? <MsgCurrentUser 
                msg={msg} 
                uid={uid} 
                setOpenMedia={setOpenMediaCallback}
                deleteQuery={DELETE_MESSAGE}
            />
            : <MsgOtherUser msg={msg} setOpenMedia={setOpenMediaCallback}/>}
            {openMedia && <OpenMedia url={msg.url} callback={setOpenMediaCallback}/>}    
        </>
    )
}

export default memo(GroupMessage)

const DELETE_MESSAGE = gql`
    mutation ($msgID: Int!){
        delete_group_chat_message(msgID: $msgID){
            groupChatId
        }
    }
`