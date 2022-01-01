import React, { memo } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../General components/Avatar'
import SetTime from '../../General components/SetTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StoryBar = ({user, date, closeStoryCallback}) => {

    return (
        <div className='story-top-bar flex-sb'>
            <Link to={'/profile/'+user.username} className='flex-ctr'>
                <Avatar size='45px' image={user.profile_picture}/>
                <p style={{marginLeft:'10px'}}>{user.username}</p>
            </Link>
            <span className='story-timestamp'>
                <SetTime timestamp={date}/>
            </span>
            <span className='flex-ac'>
                <FontAwesomeIcon
                    icon='times'
                    color='white'
                    cursor={'pointer'}
                    size='lg'
                    style={{marginRight:'10px'}} 
                    onClick={()=>closeStoryCallback(false)}
                />
            </span>
        </div>
    )
}

export default memo(StoryBar)