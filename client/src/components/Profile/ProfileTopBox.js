import React, { useCallback, useState, memo, useEffect } from 'react'
import ProfileFollowBtn from './components/ProfileFollowBtn'
import ProfileEditBtn from './components/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'
import SendMsgBtn from './components/SendMsgBtn'
import Avatar from '../General components/Avatar'
import Story from '../Stories/components/Story'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import UnblockUserBtn from './components/UnblockUserBtn'
import BlockUserBtn from './components/BlockUserBtn'
import ActivityStatusBar from './components/ActivityStatusBar'

const ProfileTopBox = ({myprofile, postsLength, user, isBlockedCB}) => {
    const [openStory, setOpenStory] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user')) 
    const [blockBtn, setBlockBtn] = useState(false)

    const {loading, error, data} = useQuery(FETCH_INFO, {
        variables: {
            userID: myprofile ? ls.userID : user.userID,
            blockerId: ls.userID
        }
    })

    useEffect(()=>{
        if(!loading){
            isBlockedCB(data?.if_user_blocked)
        }
        return
    }, [data])

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])
    
    if(error) throw error


    const info = {
        user: user,
        followers: data?.get_followers,
        following: data?.get_following,
        postsLength
    }


    return (
        <>
            <div className="profile-top-box">
                <div style={{border: (data?.get_user_stories?.length>0 && !data?.if_user_blocked) && '3px solid #ffbb00', borderRadius:'50%'}} 
                    onClick={()=>{(data?.get_user_stories?.length>0 && !data?.if_user_blocked) && setOpenStory(true)
                }}>
                    <Avatar size='170px' image={user?.profile_picture}/>
                </div>
                {!loading && <ProfileInfo info={info} last_seen={user.last_seen} blocked={data?.if_user_blocked}/>}

                {(!loading && !data?.if_user_blocked) && (myprofile ? <ProfileEditBtn/> : (
                <>
                    <ProfileFollowBtn userID={user?.userID}/>
                    <SendMsgBtn userID={user?.userID}/>
                </>
                ))} 

                {data?.if_user_blocked && <UnblockUserBtn blockedId={user.userID}/>}

                {!myprofile && <FontAwesomeIcon icon='ellipsis-v' style={styles.pfMenuBtn} onClick={()=>setBlockBtn(!blockBtn)}/>}

                {blockBtn && <BlockUserBtn userID={user.userID}/>}
                
                {!data?.if_user_blocked && <ActivityStatusBar last_seen={user.last_seen}/>}
            </div>
            
            {(!loading && openStory) && <Story 
                allData={{
                    user: user,
                    stories: data?.get_user_stories
                }} 
                i={0} 
                isProfile={true}
                closeStoryCallback={closeStoryCallback}
                />}
            
        </>
    )
}

export default memo(ProfileTopBox)


const FETCH_INFO= gql`
    query ($userID: Int!, $blockerId: Int!){
        get_followers(followedID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        get_following(followerID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        get_user_stories (userID: $userID){
            first_name
            last_name
            userID
            profile_picture
            storyID
            type
            url
            date_posted
        } 
        if_user_blocked(blockerId: $blockerId, blockedId: $userID)
    }`

const styles = {
    pfMenuBtn:{
        position:'absolute',
        top:'15px',
        right:'15px',
        color:'white',
        fontSize:'25px',
        cursor:'pointer'
    }
}