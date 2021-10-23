import React, { useEffect, useState } from 'react'
import Avatar from '../../../../UI/Avatar'


import '../../../../../App.css'
import '../../../../../General.css'
import { NavLink } from 'react-router-dom'

const Comment = ({comment}) => {
    const [time, setTime] = useState(null)

    
    useEffect(()=>{
        const getTime = () => {
            let utcSeconds = parseInt(comment.date_commented);
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
    }, [time, comment.date_commented])



    return (
        <div className='comment-cont'>
            <NavLink exact to={'/profile/'+comment.userID} style={{width:'40px',display: 'flex'}}>
                <Avatar height='40px' pfp={comment.profile_picture}/>
            </NavLink>
            <div style={{marginLeft:'10px'}}>
                <h5 style={{fontSize:'14px'}}>{comment.username}</h5>
                <p style={{fontSize:'10px',marginTop:'5px'}}>{time}</p>
            </div>
            <div style={{marginLeft:'15px',padding:'5px'}}>
                <p style={{fontSize:'15px'}}>{comment.comment_text}</p>
            </div>
        </div>
    )
}

export default Comment
