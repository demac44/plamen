import React, { useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'
import { useParams } from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupBanner from '../../components/Groups/components/GroupBanner'
import AddGroupPost from '../../components/Groups/Functional components/AddGroupPost'

const GET_GROUP = gql`
    query($gid: Int!){
        get_group(groupID: $gid){
            group_name
            group_creator_id
            date_created
            closed
            group_tags
            group_rules
            group_description
            banner_image
        }
    }
`

const Group = ({isLogged}) => {
    const {groupid} = useParams()
    const [leftnav, setLeftnav] = useState(false)
    const [updated, setUpdated] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid)
        }
    })


    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])


    if(loading) return <p>loading</p>

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <div className='group-container'>
                        <GroupBanner info={data?.get_group}/>
                        <div className='group-posts-info'>
                            <div className='group-posts'>
                                <AddGroupPost updatedCallback={updatedCallback}/>
                            </div>
                            <div className='group-info-box'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Group
