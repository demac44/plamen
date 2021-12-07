import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FollowBtn from '../Profile/components/FollowBtn'
import Avatar from '../General components/Avatar'

const NotificationBox = ({notif}) => {
    const [time, setTime] = useState(null)

    useEffect(()=>{
        const getTime = () => {
            let utcSeconds = parseInt(notif?.time_sent);
            utcSeconds = new Date(utcSeconds).getTime()
            let d = Date.now() - utcSeconds
            d = Math.floor((d/1000)/60)
            if(d===0) setTime('Now')
            else if(d<60) setTime(d+'m')
            else if(d>60 && d<60*24) setTime(Math.floor(d/60)+'h')
            else if(d>60*24 && d<60*24*30) setTime(Math.floor(d/(60*24))+'d')
            else if(d>60*24*30) {
                let d = new Date(utcSeconds)
                setTime(d.toDateString())
            }
        }
        getTime()
    }, [notif])


    return (
        <div className='notification-box' key={notif.Nid}>
            <Link to={notif.type==='follow' ? '/profile/'+notif.sender_id : '/post/'+notif.postID} className='flex-ctr'>
                <span style={{position:'relative'}}>
                    <Avatar size='50px' image={notif.profile_picture}/>
                    {notif.type==='like' && <i style={styles.typeIconLike} className="fas fa-heart"></i>}
                    {notif.type==='comment' && <i style={styles.typeIconComm} className="fas fa-comment-dots"></i>}
                    {notif.type==='follow' && <i style={styles.typeIconFoll} className="fas fa-user"></i>}
                </span>
                {notif.type==='like' && <p>{'@'+notif.username+' liked your post'}</p>}
                {notif.type==='comment' && <p>{'@'+notif.username+' commented on your post'}</p>}
                {notif.type==='follow' && <div className='flex-ctr'><p>{'@'+notif.username+' followed you'}</p></div>}
            </Link>
            <div className='nb-time flex-ctr'>
                {notif.type==='follow' && <FollowBtn uID={notif.sender_id} notifications={true}/>}
                <h5>{time}</h5>
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