import React, {memo} from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useHistory} from 'react-router-dom'
import axios from 'axios'

const Dropdown = ({closeDropd}) => {
    const history = useHistory()
    const usernm = useSelector(state => state?.isAuth?.user?.username)

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
       <div className="tn-dropdown-menu" onClick={()=>closeDropd()}>
            <ul>
                <h5 className='logged-as'>Logged in as @{usernm}</h5>
                <NavLink to={"/profile/"+usernm}><li>My profile</li></NavLink>
                <NavLink to="/login"><li>Change accounts</li></NavLink>
                <NavLink to="/settings"><li>Settings</li></NavLink>
                <NavLink to="/login"><li onClick={logout}>Log out</li></NavLink>
            </ul>
        </div>
    )
}

export default memo(Dropdown)