import React, {memo} from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../General components/Avatar'
import FollowButton from '../../General components/FollowButton'
import SetTime from '../../General components/SetTime'

const NotificationBox = ({notif}) => {
    return (
        <div className='notification-box' key={notif.Nid}>
            <Link to={notif.type==='follow' ? '/profile/'+notif.username : '/post/'+notif.postID} className='flex-ctr'>
                <span style={{position:'relative'}}>
                    <Avatar size='50px' image={notif.profile_picture}/>
                    {notif.type==='like' && <i className='fas fa-heart notif-type like-notif'/>}
                    {notif.type==='comment' && <i className='fas fa-comment notif-type comment-notif'/>}
                    {notif.type==='follow' && <i className='fas fa-user notif-type foll-notif'/>}
                    {notif.type==='mention' && <i className='fas fa-at notif-type mention-notif'/>}
                    {notif.type==='mention-cmt' && <i className='fas fa-at notif-type mention-notif'/>}
                </span>
                <span className='notif-text'>
                    {notif.type==='like' && <p>{'@'+notif.username+' liked your post'}</p>}
                    {notif.type==='comment' && <p>{'@'+notif.username+' commented on your post'}</p>}
                    {notif.type==='follow' && <p>{'@'+notif.username+' followed you'}</p>}
                    {notif.type==='mention' && <p>{'@'+notif.username+' mentioned you in post'}</p>}
                    {notif.type==='mention-cmt' && <p>{'@'+notif.username+' mentioned you in comment'}</p>}
                </span>
            </Link>
            <div className='nb-right flex-ctr'>
                {notif.type==='follow' && <FollowButton userID={notif.sender_id} notifications={true}/>}
                <SetTime timestamp={notif?.time_sent} fontSize='12px'/>
            </div>
        </div>
    )
}
export default memo(NotificationBox)