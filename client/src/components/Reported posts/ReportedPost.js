import React, { memo } from 'react'

import PostMedia from '../Post/Media/PostMedia'
import PostTextBar from '../Post/Text bar/PostTextBar'
import ReportedPostBBar from './components/Bottom bar/ReportedPostBBar'
import ReportedPostTopBar from './components/Top bar/ReportedPostTopBar'

const ReportedPost = ({post, refetchPosts}) => {
    return (
        <div className='post'>
            <ReportedPostTopBar 
                refetchPosts={refetchPosts}
                data={{
                    name: post.first_name+' '+post.last_name,
                    pfp:post.profile_picture,
                    timestamp: post.date_posted,
                    userID: post.userID,
                    username: post.username,
                    groupID: post.groupID
            }}/>
            <PostMedia data={{
                url:post.url,
                type:post.type
            }}/>
            <PostTextBar post_text={post.post_text}/>
            <ReportedPostBBar 
                postID={post.postID} 
                reportID={post.reportID} 
                refetchPosts={refetchPosts}
                reasons={post.reasons}
            />
        </div>
    )
}

export default memo(ReportedPost)
