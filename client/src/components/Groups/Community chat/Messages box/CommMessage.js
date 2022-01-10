import React, { useCallback, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import { gql } from 'graphql-tag'
import OpenMedia from '../../../Chat/components/Chat media/OpenMedia';
import MsgCurrentUser from '../../../Chat/components/Messages/MsgCurrentUser';
import MsgOtherUser from '../../../Chat/components/Messages/MsgOtherUser';

const Message = ({msg}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [openMedia, setOpenMedia] = useState(false)
    
    const setOpenMediaCallback = useCallback(val => {
        setOpenMedia(val)
    }, [setOpenMedia])
    
    return (
        <>
            {(msg.userID===uid)
            ? <MsgCurrentUser msg={msg} deleteQuery={DELETE_COMM_MESSAGE} uid={uid} setOpenMedia={setOpenMediaCallback}/>
            : <MsgOtherUser msg={msg} setOpenMedia={setOpenMediaCallback}/>}
            {openMedia && <OpenMedia url={msg.url} callback={setOpenMediaCallback}/>}    
        </>
    )
}
export default memo(Message)

const DELETE_COMM_MESSAGE = gql`
    mutation($msgID: Int!){
        delete_community_message(msgID: $msgID){
            msgID
        }
    }
`