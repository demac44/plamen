import React from 'react'
import { Link } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ProfileEditBtn = () => {
    return (
        <Link to='/settings' className="profile-top-box-buttons flex-ctr">
            <FontAwesomeIcon icon='cogs' color='#1b1b1b'/>
            <p style={{marginLeft:'5px'}}>Settings</p>
        </Link>
    )
}

export default ProfileEditBtn
