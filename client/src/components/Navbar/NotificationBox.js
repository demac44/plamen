import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../UI/Avatar'
import FollowBtn from '../Profile/Functional components/FollowBtn'


const NotificationBox = ({n}) => {
    const [time, setTime] = useState(null)

    useEffect(()=>{
        const getTime = () => {
            let utcSeconds = n?.time_sent;
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
    }, [n])


    return (
        <div className='notification-box' key={n.Nid}>
            <Link to={n.type==='follow' ? '/profile/'+n.sender_id : '/post/'+n.postID} className='flex-ctr'>
                <span style={{position:'relative'}}>
                    <Avatar height='50px' width='50px' pfp={n.profile_picture}/>
                    {n.type==='like' && <i style={styles.typeIconLike} className="fas fa-heart"></i>}
                    {n.type==='comment' && <i style={styles.typeIconComm} className="fas fa-comment-dots"></i>}
                    {n.type==='follow' && <i style={styles.typeIconFoll} className="fas fa-user"></i>}
                </span>
                {n.type==='like' && <p>{'@'+n.username+' liked your post'}</p>}
                {n.type==='comment' && <p>{'@'+n.username+' commented on your post'}</p>}
                {n.type==='follow' && <div className='flex-ctr'><p>{'@'+n.username+' followed you'}</p></div>}
            </Link>
            <div className='nb-time flex-ctr'>
                {n.type==='follow' && <FollowBtn uID={n.sender_id} notifications={true}/>}
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