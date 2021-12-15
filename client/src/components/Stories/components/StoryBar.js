import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import StoryOptions from './StoryOptions'
import Avatar from '../../General components/Avatar'
import SetTime from '../../General components/SetTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StoryBar = ({user, date, closeStoryCallback, storyID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [storyOptions, setStoryOptions] = useState(false)

    return (
        <div className='story-top-bar flex-sb'>
            <Link to={'/profile/'+user.username} className='flex-ctr' style={{height:'100%', color:'white'}}>
                <Avatar size='45px' image={user.profile_picture}/>
                <p style={{marginLeft:'10px'}}>{user.first_name+' '+user.last_name}</p>
            </Link>
            <span className='story-timestamp'>
                <SetTime timestamp={date}/>
            </span>
            <span className='flex-h'>
                <FontAwesomeIcon
                    icon='times'
                    style={{...styles.btns, marginRight:'10px'}} 
                    onClick={()=>closeStoryCallback()}
                />
                {/* {user.userID===ls.userID && 
                    <FontAwesomeIcon
                        icon='ellipsis-v' 
                        className='fp-options-btn'
                        onClick={()=>setStoryOptions(!storyOptions)}
                        style={styles.btns}
                    />}
                {storyOptions && <StoryOptions storyID={storyID} closeStoryCallback={closeStoryCallback}/>} */}
            </span>
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