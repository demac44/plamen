import React from 'react'
import AllowBtn from './components/AllowBtn'
import ReasonsBar from './components/ReasonsBar'
import RemoveBtn from './components/RemoveBtn'
import './style.css'

const ReportedPostBBar = ({postID, reportID, refetchPosts, reasons}) => {
    return (
        <div className='flex-col-ctr'>
            <div className='flex-ctr'>
                <AllowBtn postID={postID} reportID={reportID} refetch={refetchPosts}/>
                <RemoveBtn postID={postID} reportID={reportID} refetch={refetchPosts}/>
            </div>
            <div className='flex'>
                <ReasonsBar reasons={reasons}/>
            </div>
        </div>
    )
}
export default ReportedPostBBar