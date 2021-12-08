import React, { useEffect, useState } from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import axios from 'axios'

const Dropdown = () => {
    const history = useHistory()

    const logout = async () => {
        await axios({
            method:'post',
            url:'http://localhost:8000/api/logout',
            withCredentials: true
        }).then(()=>{
            localStorage.clear()
            history.push('/login')
        })
    }
    return (
       <div className="tn-dropdown-menu">
            <ul>
                <NavLink to="/myprofile"><li>My profile</li></NavLink>
                <NavLink to="/login"><li>Change accounts</li></NavLink>
                <NavLink to="/settings"><li>Settings</li></NavLink>
                <NavLink to="/login"><li onClick={logout}>Log out</li></NavLink>
            </ul>
        </div>
    )
}

export default Dropdown
