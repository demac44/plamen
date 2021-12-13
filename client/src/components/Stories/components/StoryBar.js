import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import StoryOptions from './StoryOptions'
import Avatar from '../../General components/Avatar'
import SetTime from '../../General components/SetTime'

const StoryBar = ({user, date, closeStoryCallback, storyID, updatedCallback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [storyOptions, setStoryOptions] = useState(false)

    return (
        <div className='story-top-bar flex-sb'>
            <Link to={'/profile/'+user.username} className='flex-ctr' style={{height:'100%', color:'white'}}>
                <Avatar size='45px' image={user.profile_picture}/>
                <p style={{marginLeft:'10px'}}>{user.first_name+' '+user.last_name}</p>
            </Link>
            <SetTime timestamp={date}/>
            <span>
                <i 
                    className='fas fa-times' 
                    style={{...styles.btns, marginRight:'10px'}} 
                    onClick={()=>closeStoryCallback()}
                ></i>
                {user.userID===ls.userID && 
                    <i 
                        className='fas fa-ellipsis-v fp-options-btn'
                        onClick={()=>setStoryOptions(!storyOptions)}
                        style={styles.btns}
                    ></i>}
            </span>
            {storyOptions && <StoryOptions storyID={storyID} closeStoryCallback={closeStoryCallback} updatedCallback={updatedCallback}/>}
        </div>
    )
}

export default StoryBar


const styles = {
    btns:{
        fontSize:'25px',
        color:'white',
        cursor:'pointer'
    }
}