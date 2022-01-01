import React, { useState, memo } from 'react'
import SetTime from '../../../General components/SetTime'
import Avatar from '../../../General components/Avatar'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReportedPostMenu from './components/ReportedPostMenu'
import './style.css'

const ReportedPostTopBar = ({data, refetchPosts}) => {
    const [menu, setMenu] = useState(false)

    return (
        <>
            <div className='post-top-bar flex-sb'>
                <Link to={'/profile/'+data.username} className='flex'>
                    <Avatar size='40px' image={data.pfp}/>

                    <span className='flex-col-sb rp-top-bar-name'>
                        <p>{data.name}</p>
                        <SetTime timestamp={data.timestamp} fontSize='12px'/>
                    </span>
                </Link >

                <span className='flex'>
                    <FontAwesomeIcon
                        icon='ellipsis-v' 
                        className='post-menu-btn'
                        color='white'
                        onClick={()=>setMenu(!menu)}/>
                </span>
            </div>

            {menu && <span onClick={()=>setMenu(false)}>
                <ReportedPostMenu 
                refetchPosts={refetchPosts}
                data={{
                    userID: data.userID,
                    groupID: data.groupID
                }}/>
            </span>}
        </>
    )
}

export default memo(ReportedPostTopBar)