import React, { useState, memo, useCallback } from 'react'
import SetTime from '../../../../General components/SetTime'
import SavePostButton from './components/SavePostButton'
import PostMenu from './components/PostMenu'
import Avatar from '../../../../General components/Avatar'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReportBox from './components/ReportBox'
// import './style.css'

const PostTopBar = ({data, refetchPosts}) => {
    const [reportMenu, setReportMenu] = useState(false)
    const [menu, setMenu] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleReport = useCallback((val) => {
        setReportMenu(val)
    }, [setReportMenu])
    
    const copiedCB = useCallback(()=>{
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        }, 2000)
    })

    return (
        <>
            <div className='post-top-bar flex-sb'>
                <Link to={'/profile/'+data.username} className='flex'>
                    <Avatar size='40px' image={data.pfp}/>

                    <span className='flex-col-sb users-list-names'>
                        <p style={{fontSize:'16px'}}>{data.name}</p>
                        <SetTime fontSize='12px'/>
                    </span>
                </Link >

                <span className='flex'>
                    <SavePostButton postID={data.postID} groupID={data?.groupID}/>
                    <FontAwesomeIcon
                        icon='ellipsis-v' 
                        color='white'
                        className='post-menu-btn'
                        onClick={()=>setMenu(!menu)}/>
                </span>
            </div>

            {menu && <span onClick={()=>setMenu(false)}>
                <PostMenu 
                refetchPosts={refetchPosts}
                handleReport={handleReport}
                data={{
                    postID: data.postID,
                    userID: data.userID,
                    role: data.role
                }}
                copiedCB={copiedCB}
                />
            </span>}
            {reportMenu && <ReportBox data={data} handleReportClose={handleReport}/>}
            {copied && <div className='link-copied-msg'>Link copied!</div>}
        </>
    )
}

export default memo(PostTopBar)