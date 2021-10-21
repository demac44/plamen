import React, { useEffect, useState } from 'react'
import { NavLink, useHistory} from 'react-router-dom'

const Dropdown = ({cbDropdown}) => {
    const [dropdown, setDropdown] = useState(true)
    const history = useHistory()

    useEffect(()=>{
        cbDropdown(dropdown)
    },[cbDropdown, dropdown])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        history.push('/login')
    }

    return (
       <div className="tn-dropdown-menu" onClick={()=>setDropdown(false)}>
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
