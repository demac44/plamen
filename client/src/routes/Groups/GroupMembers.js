import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import InfoBox from '../../components/Groups/components/InfoBox'
import TagsBox from '../../components/Groups/components/TagsBox'
import MembersBox from '../../components/Groups/components/MembersBox'
import Sidebar from '../../components/General components/Sidebar'

import GroupLoader from '../../components/General components/Loaders/GroupLoader'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

const GroupMembers = ({isLogged}) => {
    const {groupid} = useParams()
    const [leftnav, setLeftnav] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [tags, setTags] = useState([])
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            uid: ls.userID
        }
    })


    useEffect(()=>{
        if(updated){
            refetch()
            setUpdated(false)
        }
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

    console.log(groupid);

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <div className='main'>
                    <Sidebar show={leftnav}/>
                    <div className='container-profile'>
                        <GroupBanner info={data?.get_group} user={data?.get_group_user} updatedCallback={updatedCallback}/>
                        <TagsBox tags={tags}/>                        
                    </div>
                        <div className='container-main'>
                            <div className='container-left'>
                                {(!data.get_group.closed || data.get_group_user) ?
                                <MembersBox members={data.get_group_members}/>
                                : <p style={styles.p}><i className='fas fa-lock'></i> Join to see community members</p>}
                            </div>
                            <div className='container-right'>
                                <InfoBox data={data.get_group} membersCount={data.get_group_members.length} user={data.get_group_user}/>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default GroupMembers

const GET_GROUP = gql`
    query($gid: Int!, $uid: Int!){
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