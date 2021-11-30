import React, { useState } from 'react'
import CreateGroupForm from '../Functional components/CreateGroupForm'
import CreateGroupCard from './CreateGroupCard'
import GroupCard from './GroupCard'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

const GET_GROUPS = gql`
    query ($uid: Int!){
        get_groups(userID: $uid){
            group_name
            groupID
        }
    }
`

const GroupsGrid = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(GET_GROUPS, {
        variables:{
            uid: ls.userID
        }
    })

    if(loading) return <p>loading</p>

    return (
        <div className='groups-grid'>
            <CreateGroupCard/>
            {data.get_groups.map(group => <GroupCard group={group} key={group.groupID}/>)}
        </div>
    )
}

export default GroupsGrid
