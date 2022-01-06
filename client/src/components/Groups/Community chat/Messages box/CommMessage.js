import React, { useCallback, useState, memo } from 'react'
import { useSelector } from 'react-redux';
// import { gql } from 'graphql-tag'
// import { useMutation } from 'react-apollo'
import OpenMedia from '../../../Chat/components/Chat media/OpenMedia';
import MsgCurrentUser from '../../../Chat/components/Messages/MsgCurrentUser';
import MsgOtherUser from '../../../Chat/components/Messages/MsgOtherUser';

const Message = ({msg}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [openMedia, setOpenMedia] = useState(false)
    // const [delete_msg] = useMutation(DELETE_MESSAGE, {
    //     variables:{msgID: msg.msgID}
    // })
    
    const setOpenMediaCallback = useCallback(val => {
        setOpenMedia(val)
    }, [setOpenMedia])
    
    return (
        <>
            {(msg.userID===uid)
            ? <MsgCurrentUser msg={msg} uid={uid} setOpenMedia={setOpenMediaCallback}/>
            : <MsgOtherUser msg={msg} setOpenMedia={setOpenMediaCallback}/>}
            {openMedia && <OpenMedia url={msg.url} callback={setOpenMediaCallback}/>}    
        </>
    )
}
export default memo(Message)