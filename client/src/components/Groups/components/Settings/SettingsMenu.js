import React from 'react'
import { NavLink } from 'react-router-dom'

const SettingsMenu = ({groupid}) => {
    return (
        <div className='group-settings-menu'>
            <ul>
               <NavLink to={'/community/'+groupid+'/settings/join_requests'}><li>Join requests</li></NavLink>   
               <NavLink to={'/community/'+groupid+'/settings/manage_users'}><li>Manage users</li></NavLink>   
               <NavLink to={'/community/'+groupid+'/settings/manage_posts'}><li>Manage posts</li> </NavLink>    
               <NavLink to={'/community/'+groupid+'/settings/edit_info'}><li>Community settings</li></NavLink>
            </ul>
        </div>
    )
}

export default SettingsMenu
