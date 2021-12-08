import React from 'react'
import { NavLink } from 'react-router-dom';
import FollowBtn from '../../Profile/components/FollowBtn';
import Avatar from '../Avatar';

const UserBox = ({user}) => {
    const ls =JSON.parse(localStorage.getItem('user'))
    return (
        <div className='foll-user-box'>
            <NavLink exact to={user.userID === ls.userID ? '/myprofile' : '/profile/'+user.userID} className='flex-ctr'>
                <Avatar size='60px' image={user.profile_picture}/>
                <div className='foll-user-info flex-col-ctr'>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <p>@{user.username}</p>
                </div>
            </NavLink>
            {user.userID === ls.userID ? null : <FollowBtn uID={user.userID}/>}
        </div>
    )
}

export default UserBox
