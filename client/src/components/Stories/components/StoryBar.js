import React, { memo } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../General components/Avatar'
import SetTime from '../../General components/SetTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StoryBar = ({user, date, closeStoryCallback}) => {

    return (
        <div className='story-top-bar flex-sb'>
            <Link to={'/profile/'+user.username} className='flex-ctr' style={{height:'100%', color:'white'}}>
                <Avatar size='45px' image={user.profile_picture}/>
                <p style={{marginLeft:'10px'}}>{user.username}</p>
            </Link>
            <span className='story-timestamp'>
                <SetTime timestamp={date}/>
            </span>
            <span className='flex-h'>
                <FontAwesomeIcon
                    icon='times'
                    style={{...styles.btns, marginRight:'10px'}} 
                    onClick={()=>closeStoryCallback(false)}
                />
            </span>
        </div>
    )
}

export default memo(StoryBar)


const styles = {
    btns:{
        fontSize:'25px',
        color:'white',
        cursor:'pointer'
    }
}