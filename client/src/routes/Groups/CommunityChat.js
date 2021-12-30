import React, { memo } from 'react'

import '../../components/Groups/Community chat/Style.css'
import Navbar from '../../components/Navbar/Navbar'
import { Redirect, useParams } from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Sidebar from '../../components/General components/Sidebar'

import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

import { useSelector } from 'react-redux'
import CommChatBar from '../../components/Groups/Community chat/Top bar/CommChatBar'
import CommChatMsgBox from '../../components/Groups/Community chat/Messages box/CommChatMsgBox'
import CommSendMsg from '../../components/Groups/Community chat/Send message box/CommSendMsg'

const CommunityChat = ({isLogged}) => {
    const {groupid} = useParams()
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {data, loading} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            limit:20,
            offset:0,
            uid
        }
    })

    if(!loading){
        if(!data?.get_group_user) return <Redirect to='/404'/>
    }

    return (
        <>
            <Navbar isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar/>
                <div className='community-chat-container flex-col'>
                    {!loading &&
                    <>
                        <CommChatBar name={data?.get_group?.group_name} groupid={groupid}/>
                        <CommChatMsgBox groupID={parseInt(groupid)}/>
                        <CommSendMsg groupID={parseInt(groupid)}/>
                    </>
                    }       
                </div>
            </div>
        </>
    )
}

export default memo(CommunityChat)

const GET_GROUP = gql`
    query($gid: Int!, $uid: Int!){
        get_group(groupID: $gid){
            groupID
            group_name
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
        }
        get_group_members(groupID:$gid){
            userID
        }
    }
`