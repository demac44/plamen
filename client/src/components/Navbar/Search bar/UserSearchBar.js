import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../General components/Avatar'
import UserLoader from '../../General components/Loaders/UserLoader'

const UserSearchBar = ({user, dropdownCallback}) => {
    
    if(!user) return <UserLoader/>

    return (
        <Link to={'/profile/'+user.username} className='search-user-box' onClick={()=>dropdownCallback()}>
            <Avatar size='50px' image={user.profile_picture}/>
            <div className='users-list-names'>
                <p>{user.first_name+' '+user.last_name}</p>
                <h5>@{user.username}</h5>
            </div>
        </Link> 
    )
}
export default UserSearchBar

