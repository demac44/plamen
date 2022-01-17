import React from 'react'
import { useSelector } from 'react-redux';
import Avatar from '../../../General components/Avatar'
import { Link } from 'react-router-dom';

const ChatSearchBarUser = ({user}) => {
    const usernm= useSelector(state => state.isAuth.user?.username)

    return (
        <Link to={{
            pathname:'/chat/'+usernm+'/'+user.username, 
            state: {
                first_name: user?.first_name,
                last_name: user?.last_name,
                username: user?.username,
                profile_picture: user?.profile_picture,
                last_seen: user.last_seen
        }}} className='search-user-box'>
            <Avatar size='50px' image={user.profile_picture}/>
            <div style={{marginLeft:'15px'}}>
                <p>{user.first_name+' '+user.last_name}</p>
                <h5>@{user.username}</h5>
            </div>
        </Link>
    )
}

export default ChatSearchBarUser
