import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import InfoBox from '../../components/Groups/components/InfoBox'
import TagsBox from '../../components/Groups/components/TagsBox'
import CreatePost from '../../components/Post/Create post/CreatePost'
import Sidebar from '../../components/General components/Sidebar'

import GroupLoader from '../../components/General components/Loaders/GroupLoader'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'


const Group = ({isLogged}) => {
    const {groupid} = useParams()
    const [leftnav, setLeftnav] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [tags, setTags] = useState([])
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            limit:20,
            offset:0,
            uid: ls.userID
        }
    })


    useEffect(()=>{
        if(data){
            setTags(data.get_group.group_tags.split(','))
        }
    }, [refetch, updated, data])

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])


    if(loading) return <GroupLoader/>

    const posts = data?.get_group_posts

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar show={leftnav}/>
                <div className='container-profile'>
                    <GroupBanner info={data?.get_group} user={data.get_group_user} updatedCallback={updatedCallback}/>
                    <TagsBox tags={tags}/>                        
                </div>
                <div className='container-main'>
                        <div className='container-left'>
                            {data.get_group_user && <CreatePost/>}
                        </div>
                        <div className='container-right'>
                            <InfoBox data={data.get_group} membersCount={data.get_group_members.length} user={data.get_group_user}/>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Group

const GET_GROUP = gql`
    query($gid: Int!, $limit: Int, $offset: Int, $uid: Int!){
        get_group(groupID: $gid){
            groupID
            group_name
            group_creator_id
            date_created
            closed
            group_tags
            group_rules
            group_description
            banner_image
        }
        get_group_posts (groupID: $gid, limit: $limit, offset: $offset){
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
            permissions
        }
        get_group_members(groupID:$gid){
            username
            first_name
            last_name
            userID
            profile_picture
            date_joined
            role
        }
    }
`
const styles = {
    p: {marginTop:'60px', 
        color:'white', 
        textAlign:'center', 
        width:'100%'}
}