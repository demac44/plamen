import React from 'react'
import ChatList from '../../components/Chat/components/Chat users list/ChatList'
import GroupChatMsgBox from '../../components/Chat/components/Group chat/Messages/GroupChatMsgBox'

const GroupChat = () => {
  return (
    <>
        {((window.innerWidth<768 &&  window.location.pathname==='/chats') || window.innerWidth>768) && <ChatList/>}
        <GroupChatMsgBox/>
    </>
  );
};

export default GroupChat;
