import React, { useState } from 'react'

const RolesMenu = ({setRoleCb}) => {
    const [role, setRole] = useState('')

    const handleChangeRole = (role) => {

    }


    return (
        <div className='roles-menu'>
            <ul>
                <li  onClick={()=>setRoleCb('ADMIN')}>CREATOR</li>
                <li>ADMIN</li>
                <li>MODERATOR</li>
                <li>MEMBER</li>
            </ul>
        </div>
    )
}

export default RolesMenu
