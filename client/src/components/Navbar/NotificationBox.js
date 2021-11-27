import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../UI/Avatar'

const NotificationBox = ({n}) => {
    const [time, setTime] = useState(null)

    useEffect(()=>{
        const getTime = () => {
            let utcSeconds = n?.time_sent;
            utcSeconds = new Date(utcSeconds).getTime()
            let d = Date.now() - utcSeconds
            d = Math.floor((d/1000)/60)
            if(d===0) setTime('Now')
            else if(d<60) setTime(d+'m ago')
            else if(d>60 && d<60*24) setTime(Math.floor(d/60)+'h ago')
            else if(d>60*24 && d<60*24*30) setTime(Math.floor(d/(60*24))+'d ago')
            else if(d>60*24*30) {
                let d = new Date(utcSeconds)
                setTime(d.toDateString())
            }
        }
        getTime()
    }, [n])


    return (
        <Link to={'/post/'+n.postID} className='notification-box' key={n.Nid}>
            <span className='flex-ctr'>
                <span style={{position:'relative'}}>
                    <Avatar height='100%' width='50px' pfp={n.profile_picture}/>
                    {n.type==='like' && <i style={styles.typeIconLike} className="fas fa-heart"></i>}
                    {n.type==='comment' && <i style={styles.typeIconComm} className="fas fa-comment-dots"></i>}
                </span>
                {n.type==='like' && <p>{'@'+n.username+' liked your post.'}</p>}
                {n.type==='comment' && <p>{'@'+n.username+' commented on your post.'}</p>}
            </span>
            <h5>{time}</h5>
        </Link>
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
}