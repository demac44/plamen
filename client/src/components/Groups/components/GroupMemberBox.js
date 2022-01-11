import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../General components/Avatar'

const GroupMemberBox = ({member}) => {
    const [date, setDate] = useState('')
    const [role] = useState(()=>{
        if(member.role==="CREATOR") return {role: "CREATOR", color: '#771d1d'}
        else if(member.role==='ADMIN') return {role: "ADMIN", color: '#572157'}
        else if(member.role==='MODERATOR') return {role: "MOD", color: '#0b2670'}
        else if(member.role==='MEMBER') return {role: "CREATOR", color: '#252a38'}
        return {role:"", color:"#2f2f2f"}
    })

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
            <div className='cmnty-role-tag' style={{backgroundColor: role?.color}}>{role?.role}</div>
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