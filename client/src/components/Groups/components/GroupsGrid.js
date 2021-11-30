import React, { useState } from 'react'
import CreateGroupCard from './CreateGroupCard'
import GroupCard from './GroupCard'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'


const GroupsGrid = ({groups}) => {
    return (
        <div className='groups-grid'>
            <CreateGroupCard/>
            {groups?.map(group => <GroupCard group={group} key={group.groupID}/>)}
        </div>
    )
}

export default GroupsGrid
