import React, {memo} from 'react'
import CreateGroupCard from './CreateGroupCard'
import GroupCard from './GroupCard'


const GroupsGrid = ({groups}) => {
    return (
        <div className='groups-grid'>
            <CreateGroupCard/>
            {groups?.map(group => <GroupCard group={group} key={group.groupID}/>)}
        </div>
    )
}

export default memo(GroupsGrid)
