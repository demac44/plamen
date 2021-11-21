import React, { useEffect, useState } from 'react'
import Avatar from '../../../UI/Avatar'
import {Link} from 'react-router-dom'
import StoryOptions from '../Functional components/StoryOptions'


const StoryBar = ({user, date, closeStoryCallback, storyID, updatedCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [time, setTime] = useState('')
    const [storyOptions, setStoryOptions] = useState(false)

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
            <Link to={'/profile/'+user.userID} className='flex-ctr' style={{height:'100%', color:'white'}}>
                <Avatar height='100%' width='50px' pfp={user.profile_picture}/>
                <p style={{marginLeft:'10px'}}>{user.first_name+' '+user.last_name}</p>
            </Link>
            <p>{time}</p>
            <span>
                <i className='fas fa-times fp-options-btn' onClick={()=>closeStoryCallback()}></i>
                {user.userID===ls.userID && <i 
                    className='fas fa-ellipsis-v fp-options-btn'
                    onClick={()=>setStoryOptions(!storyOptions)}
                ></i>}
            </span>
            {storyOptions && <StoryOptions storyID={storyID} closeStoryCallback={closeStoryCallback} updatedCallback={updatedCallback}/>}
        </div>
    )
}

export default StoryBar
