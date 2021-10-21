import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="edit-pf-sidebar">
            <ul className="ln-list">
                <NavLink to="/feed"><li>Edit info</li></NavLink>
                <NavLink to="#"><li>Change password</li></NavLink>
            </ul>
        </div>
    )
}

export default Sidebar
