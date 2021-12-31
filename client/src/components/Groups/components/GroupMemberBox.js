import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../General components/Avatar'
const GroupMemberBox = ({member}) => {
    const [date, setDate] = useState('')

    useEffect(()=>{
        setDate(getDateJoined(member.date_joined))
    }, [member])

    return (
        <Link to={'/profile/'+member.username} className='group-member-box flex-sb'>
            <div style={{height:'100%'}} className='flex-sb'>
                <Avatar size='50px' image={member.profile_picture}/>
                <div style={{marginLeft:'10px', color:'white', height:'100%'}} className='flex-col-sb'>
                    <span style={{marginTop:'8px'}}>
                        <p>{member.first_name+' '+member.last_name}</p>
                        <h5>@{member.username}</h5>
                    </span>
                    <p style={{fontSize:'12px'}}>Member since {date}</p>
                </div>
            </div>
            {member.role==='CREATOR' && <div className='cmnty-role-tag' style={{backgroundColor:'#771d1d'}}>CREATOR</div>}
            {member.role==='ADMIN' && <div className='cmnty-role-tag' style={{backgroundColor:'#572157'}}>ADMIN</div>}
            {member.role==='MODERATOR' && <div className='cmnty-role-tag' style={{backgroundColor:'#0b2670'}}>MOD</div>}
            {member.role==='MEMBER' && <div className='cmnty-role-tag' style={{backgroundColor:'#252a38'}}>MEMBER</div>}
        </Link>
    )
}

export default memo(GroupMemberBox)

const getDateJoined = (timestamp) => {
    let date = new Date(parseInt(timestamp))
    const m = date.toLocaleString('default', { month: 'short' });
    const y = date.getFullYear()
    return m+' '+y
}