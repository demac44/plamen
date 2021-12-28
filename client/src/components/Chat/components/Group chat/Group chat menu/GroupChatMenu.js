import React, { useCallback, useState, memo, useEffect } from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from 'react-apollo'
import AllChatMedia from '../../AllChatMedia'
import ChatMembersBox from './ChatMembersBox'
import AddChatMembers from './AddChatMembers'
import LeaveChatBtn from './LeaveChatBtn'
import DeleteChat from './DeleteChat'
import { useSelector } from 'react-redux';

 
const GroupChatMenu = ({chatID, admin}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const [chatMedia, setChatMedia] = useState(false)
    const [adminMember, setAdminMember] = useState({})

    const {data, loading, refetch} = useQuery(GET_MEMBERS, {
        variables:{
            gcId: chatID,
            limit:10,
            offset:0,
            userID: uid
        }
    })

    useEffect(()=>{
        if(!loading){
            const findAdmin = data?.get_group_chat_members?.filter(user => {
                return user.userID===admin
            })
            setAdminMember(findAdmin[0])
            return
        }
        return 0
    }, [data, admin, loading])

    const closeAllMediaCallback = useCallback(()=>{
        setChatMedia(false)
    }, [setChatMedia])

    return (
        <>
            <div className='chat-menu'>
                <ul className='flex-col-ac'>
                    {!loading && <ChatMembersBox 
                                    data={data} 
                                    admin={admin} 
                                    refetch={refetch}
                                    chatID={chatID}
                                    adminMember={adminMember}
                                />}

                    {uid===admin && 
                        <AddChatMembers 
                            data={data} 
                            chatID={chatID} 
                            refetch={refetch}/>}

                    <li 
                        onClick={()=>setChatMedia(true)} 
                        style={{marginTop:'15px'}}
                        >See chat media
                    </li>

                    <LeaveChatBtn 
                        data={data} 
                        chatID={chatID} 
                        admin={admin}
                    />

                    {uid===admin && <DeleteChat 
                        chatID={chatID} 
                        admin={admin}
                    />}
                </ul>
            </div>
            {chatMedia && 
                <AllChatMedia 
                    chatID={chatID} 
                    closeAllMediaCallback={closeAllMediaCallback}
                />
            }
        </>
    )
}

export default memo(GroupChatMenu)



const GET_MEMBERS = gql`
    query ($gcId: Int!, $limit: Int!, $offset: Int!){
        get_group_chat_members (groupChatId: $gcId, limit: $limit, offset: $offset){
            first_name
            last_name
            username
            userID
        }
    }
`