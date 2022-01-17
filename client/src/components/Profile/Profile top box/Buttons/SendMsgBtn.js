import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const SendMsgBtn = ({user}) => {
    const usernm = useSelector(state => state?.isAuth?.user?.username)
    
    return (
        <Link to={{
            pathname:'/chat/'+usernm+'/'+user.username, 
            state: {
                first_name: user?.first_name,
                last_name: user?.last_name,
                username: user?.username,
                profile_picture: user?.profile_picture,
                last_seen: user.last_seen
        }}}className="profile-top-box-buttons btn send-msg-btn flex-ctr">
            <p>Send message</p>
        </Link>
    )
}

export default SendMsgBtn
