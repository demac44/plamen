import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = ({group}) => {
    return (
        <Link to={'/community/'+group.groupID} className='group-card' style={{backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16)}}>
            <div className='gcard_overlay flex-ctr'>
                <p>{group.group_name}</p>
            </div>
        </Link>
    )
}

export default GroupCard
