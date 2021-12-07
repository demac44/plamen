import React from 'react'
import GroupMemberBox from './GroupMemberBox'

const MembersBox = ({members}) => {
    return (
        <div className='group-members-box'>
            {members.map(member => <GroupMemberBox member={member} key={member.userID}/>)}
        </div>
    )
}

export default MembersBox
