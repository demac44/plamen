import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../../General components/Avatar'
import AcceptBtn from './AcceptBtn'
import DenyBtn from './DenyBtn'
import './style.css'
const JoinRequest = ({req, refetch}) => {
    return (
        <div className='users-list-user-box flex-sb'>
            <Link to={'/profile/'+req.username} className='flex-ctr'>
                <Avatar size='40px' image={req.profile_picture}/>
                <div className='users-list-names'>
                    <p>{req.first_name+' '+req.last_name}</p>
                    <p>@{req.username}</p>
                </div>
            </Link>
            <div className='flex-ctr'>
                <AcceptBtn 
                    userID={req.userID} 
                    groupID={req.groupID}
                    refetch={refetch}
                />
                <DenyBtn
                    userID={req.userID} 
                    groupID={req.groupID}
                    refetch={refetch}
                />
            </div>
        </div>
    )
}

export default JoinRequest