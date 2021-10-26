import React from 'react'
import  Avatar from '../UI/Avatar'
import {NavLink} from 'react-router-dom'

const UserSearchBar = ({user}) => {
    return (
        <NavLink exact to={'/profile/'+user.userID} className='search-user-box'>
            <Avatar height='100%' width='56px' pfp={user.profile_picture}/>
            <div style={{marginLeft:'15px'}}>
                <p>{user.first_name+' '+user.last_name}</p>
                <h5>@{user.username}</h5>
            </div>
        </NavLink>
    )
}

export default UserSearchBar
