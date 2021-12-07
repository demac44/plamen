import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../General components/Avatar'

const GroupMemberBox = ({member}) => {
    const [date, setDate] = useState('')


    useEffect(()=>{
        let date = new Date(parseInt(member.date_joined))
        const m = date.toLocaleString('default', { month: 'short' });
        const y = date.getFullYear()
        setDate(m+' '+y)
    }, [member])

    return (
        <Link to={'/profile/'+member.userID} className='group-member-box flex-sb'>
            <div style={{height:'100%'}} className='flex-sb'>
                <Avatar height='65px' width='65px' pfp={member.profile_picture}/>
                <div style={{marginLeft:'10px', color:'white', height:'100%'}} className='flex-col-sb'>
                    <span style={{marginTop:'8px'}}>
                        <p>{member.first_name+' '+member.last_name}</p>
                        <h5>@{member.username}</h5>
                    </span>
                    <p style={{fontSize:'12px'}}>Member since {date}</p>
                </div>
            </div>
            {member.role==='CREATOR' && <div style={{...styles.roleTag, backgroundColor:'#771d1d'}}>CREATOR</div>}
            {member.role==='ADMIN' && <div style={{...styles.roleTag, backgroundColor:'#572157'}}>ADMIN</div>}
            {member.role==='MODERATOR' && <div style={{...styles.roleTag, backgroundColor:'#0b2670'}}>MOD</div>}
            {member.role==='MEMBER' && <div style={{...styles.roleTag, backgroundColor:'#252a38'}}>MEMBER</div>}
        </Link>
    )
}

export default GroupMemberBox

const styles = {
    roleTag:{
        fontSize:'12px',
        padding:'3px 8px',
        color:'white',
        borderRadius:'20px',
        position:'absolute',
        top:'8px',
        right:'10px'
    }
}