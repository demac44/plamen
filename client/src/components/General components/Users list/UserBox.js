import React from 'react'
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';
import FollowButton from '../FollowButton';
import { useSelector } from 'react-redux';
import './style.css'
const UserBox = ({user}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)

    return (
        <div className='users-list-user-box flex-sb'>
            <NavLink exact to={'/profile/'+user.username} className='flex-ctr'>
                <Avatar size='40px' image={user.profile_picture}/>
                <div className='users-list-names'>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <p>@{user.username}</p>
                </div>
            </NavLink>
            {(user && (user.userID !== uid)) && <FollowButton userID={user.userID}/>}
        </div>
    )
}

export default UserBox