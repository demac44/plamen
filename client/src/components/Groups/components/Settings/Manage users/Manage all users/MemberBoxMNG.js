import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../../../General components/Avatar'
import RemoveBtn from './RemoveBtn'
import RolesMenu from './RolesMenu'

const MemberBoxMNG = ({member}) => {
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
    }, [])

    return (
        <div className='users-list-user-box flex-sb'>
            <Link to={'/profile/'+member.username} className='flex-ctr'>
                <Avatar size='40px' image={member.profile_picture}/>
                <div style={styles.namesBox}>
                    <p style={{fontSize:'14px'}}>{member.first_name+' '+member.last_name}</p>
                    <p style={{fontSize:'12px'}}>@{member.username}</p>
                </div>
            </Link>

            <div style={styles.rightBox} className='flex-ctr'>
                {rolesMenu && <RolesMenu setRoleCb={setRoleCb}/>}

                <span className='flex-ctr' style={styles.rolesBox} onClick={()=>setRolesMenu(!rolesMenu)}>
                    <p style={{...styles.roleTag, backgroundColor: tagColor}}>{role}</p>
                    <FontAwesomeIcon icon='sort-down' size='lg' style={{marginTop:'-7px'}}/>
                </span>

            </div>
            
            <RemoveBtn/>

        </div>
    )
}

export default MemberBoxMNG


const styles = {
    namesBox:{
        color:'white',
        marginLeft:'15px'
    },
    rightBox:{
        position:'relative'
    },
    roleTag:{
        fontSize:'12px',
        padding:'3px 8px',
        color:'white',
        borderRadius:'20px',
        marginRight:'5px'
    },
    rolesBox:{
    },
}

