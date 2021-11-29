import React from 'react'
import CreateGroupCard from './CreateGroupCard'
import GroupCard from './GroupCard'

const GroupsGrid = () => {
    return (
        <div className='groups-grid'>
            <CreateGroupCard/>
            <GroupCard/>
            <GroupCard/>
            <GroupCard/>
            <GroupCard/>
            <GroupCard/>
            <GroupCard/>
            <GroupCard/>
            <GroupCard/>
        </div>
    )
}

export default GroupsGrid
