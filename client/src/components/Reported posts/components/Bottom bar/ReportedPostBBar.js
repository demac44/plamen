import React from 'react'
import AllowBtn from './components/AllowBtn'
import ReasonsBar from './components/ReasonsBar'
import RemoveBtn from './components/RemoveBtn'

const ReportedPostBBar = ({postID, reportID, refetchPosts, reasons}) => {
    return (
        <div className='flex-col-ctr' style={styles.bar}>
            <div className='flex-ctr'>
                <AllowBtn postID={postID} reportID={reportID} refetch={refetchPosts}/>
                <RemoveBtn postID={postID} reportID={reportID} refetch={refetchPosts}/>
            </div>
            <div style={styles.bar} className='flex'>
                <ReasonsBar reasons={reasons}/>
            </div>
        </div>
    )
}

export default ReportedPostBBar


const styles = {
    bar:{
        width:'100%',
        padding:'5px'
    }
}