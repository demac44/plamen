import React from 'react'
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';
import FollowButton from '../FollowButton';
import { useSelector } from 'react-redux';

const UserBox = ({user}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)

    return (
        <div className='users-list-user-box flex-sb'>
            <NavLink exact to={'/profile/'+user.username} className='flex-ctr'>
                <Avatar size='40px' image={user.profile_picture}/>
                <div style={styles.namesBox}>
                    <p style={{fontSize:'14px'}}>{user.first_name+' '+user.last_name}</p>
                    <p style={{fontSize:'12px'}}>@{user.username}</p>
                </div>
            </NavLink>
            {(user && (user.userID !== uid)) && <FollowButton userID={user.userID}/>}
        </div>
    )
}

export default UserBox


const styles = {
    namesBox:{
        color:'white',
        marginLeft:'15px'
    }
}