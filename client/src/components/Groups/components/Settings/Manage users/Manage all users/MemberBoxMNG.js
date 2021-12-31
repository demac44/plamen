import React, { useCallback, useEffect, useState, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Avatar from '../../../../../General components/Avatar'
import RemoveBtn from './RemoveBtn'
import RolesMenu from './RolesMenu'
import './style.css'

const MemberBoxMNG = ({member, refetch, currentUserRole}) => {
    const [rolesMenu, setRolesMenu] = useState(false)
    const [tagColor, setTagColor] = useState('')
    const [role, setRole] = useState(member.role)

    useEffect(()=>{
        if(role==='CREATOR') setTagColor('#771d1d')
        else if (role==='ADMIN')  setTagColor('#572157')
        else if (role==='MODERATOR') setTagColor('#0b2670')
        else if (role==='MEMBER') setTagColor('#252a38')
        return
    }, [member, role])

    const setRoleCb = useCallback(val => {
        setRole(val)
        setRolesMenu(false)
    }, [])

    return (
        <div className='users-list-user-box flex-sb'>
            <Link to={'/profile/'+member.username} className='flex-ctr'>
                <Avatar size='40px' image={member.profile_picture}/>
                <div className='users-list-names'>
                    <p>{member.first_name+' '+member.last_name}</p>
                    <p>@{member.username}</p>
                </div>
            </Link>

            <div className='flex-ctr'>
                {rolesMenu && 
                    <RolesMenu 
                        setRoleCb={setRoleCb}
                        userID={member.userID}
                        groupID={member.groupID} 
                    />}

                <span className='flex-ctr' onClick={()=> role!=='CREATOR' && setRolesMenu(!rolesMenu)}>
                    <p style={{backgroundColor: tagColor}} className='mng-memb-role-tag'>{role}</p>
                    {role!=='CREATOR' && <FontAwesomeIcon icon='sort-down' size='lg' style={{marginTop:'-7px'}}/>}
                </span>

            </div>
            
            {role!=='CREATOR' &&
                ((currentUserRole.role==='CREATOR' || (currentUserRole.role==='ADMIN' && role!=='ADMIN')) &&
                <RemoveBtn 
                    userID={member.userID} 
                    groupID={member.groupID} 
                    refetch={refetch}
                />)}

        </div>
    )
}

export default memo(MemberBoxMNG)