import React, { useEffect, useState } from 'react'
import Avatar from '../../../UI/Avatar'

const StoryBar = ({user, date}) => {
    const [time, setTime] = useState('')

    useEffect(()=>{
        let utcSeconds = date;
        utcSeconds = new Date(utcSeconds).getTime()
        let d = Date.now() - utcSeconds
        d = Math.floor((d/1000)/60)
        if(d===0) setTime('Now')
        else if(d<60) setTime(d+'m ago')
        else if(d>60 && d<60*24) setTime(Math.floor(d/60)+'h ago')
        else if(d>60 && d<60*24) setTime(Math.floor(d/60)+'h ago')
    }, [date])

    return (
        <div className='story-bar'>
            <div className='flex-ctr' style={{height:'100%'}}>
                <Avatar height='100%' width='50px' pfp={user.profile_picture}/>
                <p style={{marginLeft:'10px'}}>{user.first_name+' '+user.last_name}</p>
            </div>
            <p>{time}</p>
            <i className='fas fa-ellipsis-v fp-options-btn'></i>
        </div>
    )
}

export default StoryBar
