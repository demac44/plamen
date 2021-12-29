import React, { useEffect, useState, memo } from 'react'

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
    const [tags, setTags] = useState([])
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            limit:20,
            offset:0,
            uid
        }
    })

    useEffect(()=>{
        if(data){
            setTags(data?.get_group?.group_tags?.split(','))
        }
    }, [refetch, data])

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
                    <CommChatBar name={data?.get_group?.group_name} groupid={groupid}/>
                    <CommChatMsgBox groupID={parseInt(groupid)}/>
                    <CommSendMsg groupID={parseInt(groupid)}/>
                </div>
            </div>
        </>
    )
}

export default memo(CommunityChat)

const GET_GROUP = gql`
    query($gid: Int!, $limit: Int, $offset: Int, $uid: Int!){
        get_group(groupID: $gid){
            groupID
            group_name
            group_creator_id
            date_created
        }
        get_group_posts (groupID: $gid, limit: $limit, offset: $offset){
            groupID
            postID
            post_text
            date_posted
            url
            userID
            first_name
            last_name
            username
            profile_picture
            type
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
        }
        get_group_members(groupID:$gid){
            userID
        }
    }
`
const styles = {
    locked:{
        color:'white',
        width:'100%',
        height:'200px'
    }
}