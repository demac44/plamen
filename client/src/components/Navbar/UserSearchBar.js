import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../General components/Avatar'
import UserLoader from '../General components/Loaders/UserLoader'


const UserSearchBar = ({user}) => {
    
    if(!user) return <UserLoader/>

    return (
        <Link exact to={'/profile/'+user.username} className='search-user-box'>
            <Avatar size='50px' image={user.profile_picture}/>
            <div style={{marginLeft:'15px'}}>
                <p>{user.first_name+' '+user.last_name}</p>
                <h5>@{user.username}</h5>
            </div>
        </Link> 
    )
}

export default memo(UserSearchBar)

