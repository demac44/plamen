import React from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import axios from 'axios'

const Dropdown = () => {
    const history = useHistory()
    const ls = JSON.parse(localStorage.getItem('user'))

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
                <h5 style={styles.loggedAs}>Logged in as @{ls.username}</h5>
                <NavLink to="/myprofile"><li>My profile</li></NavLink>
                <NavLink to="/login"><li>Change accounts</li></NavLink>
                <NavLink to="/settings"><li>Settings</li></NavLink>
                <NavLink to="/login"><li onClick={logout}>Log out</li></NavLink>
            </ul>
        </div>
    )
}

export default Dropdown


const styles = {
    loggedAs:{
        width:'100%',
        padding:'10px 15px',
        color:'white'
    }
}