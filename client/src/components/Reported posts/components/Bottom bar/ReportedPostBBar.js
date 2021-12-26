import React from 'react'
import AllowBtn from './components/AllowBtn'
import RemoveBtn from './components/RemoveBtn'

const ReportedPostBBar = ({postID, reportID, refetchPosts}) => {
    return (
        <div className='flex-ctr' style={styles.bar}>
            <AllowBtn postID={postID} reportID={reportID} refetch={refetchPosts}/>
            <RemoveBtn postID={postID} reportID={reportID} refetch={refetchPosts}/>
        </div>
    )
}

export default ReportedPostBBar


const styles = {
    bar:{
        width:'100%',
        padding:'10px'
    }
}