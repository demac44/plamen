import React, { memo } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../../../General components/Avatar'
import SetTime from '../../../../General components/SetTime'

const StoryBar = ({user, date, closeStoryCallback}) => {

    return (
        <div className='story-top-bar flex-sb'>
            <Link to={'/profile/'+user.username} className='flex-ctr'>
                <Avatar size='45px' image={user.profile_picture}/>
                <p style={{margin:'0 0 0 10px'}}>{user.username}</p>
            </Link>
            <span className='story-timestamp'>
                <SetTime timestamp={date}/>
            </span>
            <span className='flex-ac'>
                <i
                    className='fas fa-times'
                    style={{marginRight:'10px'}} 
                    onClick={()=>closeStoryCallback(false)}
                />
            </span>
        </div>
    )
}

export default memo(StoryBar)