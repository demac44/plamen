import React from 'react'
import { NavLink } from 'react-router-dom'

const SettingsMenu = ({groupid}) => {
    return (
        <div className='group-settings-menu'>
            <ul>
               <NavLink to={'/community/'+groupid+'/settings/edit_info'}><li>Community info</li></NavLink>
               <NavLink to={'/community/'+groupid+'/settings/manage_posts'}><li>Manage posts</li> </NavLink>    
               <NavLink to={'/community/'+groupid+'/settings/manage_users'}><li>Manage users</li></NavLink>   
            </ul>
        </div>
    )
}

export default SettingsMenu
