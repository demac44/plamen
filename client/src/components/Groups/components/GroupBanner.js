import React, {memo} from 'react'
import JoinBtn from './JoinBtn'
const GroupBanner = ({info, user, updatedCallback}) => {
    return (
        <div className='group-banner'>
            <img className='wh-100' src={info.banner_image} alt=''/>
            <span className='group-banner-name-bar'>
                <h1>{info.group_name}</h1>
            </span>
            <JoinBtn info={info} user={user} updatedCallback={updatedCallback}/>
        </div>
    )
}
export default memo(GroupBanner) 