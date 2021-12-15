import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../General components/Avatar'
import FollowButton from '../General components/FollowButton'
import SetTime from '../General components/SetTime'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const NotificationBox = ({notif}) => {
    return (
        <div className='notification-box' key={notif.Nid}>
            <Link to={notif.type==='follow' ? '/profile/'+notif.username : '/post/'+notif.postID} className='flex-ctr'>
                <span style={{position:'relative'}}>
                    <Avatar size='50px' image={notif.profile_picture}/>
                    {notif.type==='like' && <FontAwesomeIcon icon='heart' style={styles.typeIconLike}/>}
                    {notif.type==='comment' && <FontAwesomeIcon icon='comment' style={styles.typeIconComm}/>}
                    {notif.type==='follow' && <FontAwesomeIcon icon='user' style={styles.typeIconFoll}/>}
                </span>
                {notif.type==='like' && <p>{'@'+notif.username+' liked your post'}</p>}
                {notif.type==='comment' && <p>{'@'+notif.username+' commented on your post'}</p>}
                {notif.type==='follow' && <div className='flex-ctr'><p>{'@'+notif.username+' followed you'}</p></div>}
            </Link>
            <div className='nb-time flex-ctr'>
                {/* {notif.type==='follow' && <FollowButton uID={notif.sender_id} notifications={true}/>} */}
                <SetTime timestamp={notif?.time_sent}/>
            </div>
        </div>
    )
}

export default NotificationBox


const styles = {
    typeIconLike:{
        position:'absolute',
        top:'0',
        right:'-5px',
        fontSize:'20px',
        color:'#c00303'
    },
    typeIconComm:{
        position:'absolute',
        top:'0',
        right:'-5px',
        fontSize:'20px',
        color:'#14578d'
    },
    typeIconFoll:{
        position:'absolute',
        top:'0',
        right:'-5px',
        fontSize:'20px',
        color:'#008607'
    },
}