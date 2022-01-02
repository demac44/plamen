import React, { useCallback, useState, memo, useEffect } from 'react'
import { useSelector } from 'react-redux';
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import ProfileFollowBtn from './components/ProfileFollowBtn'
import ProfileEditBtn from './components/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'
import SendMsgBtn from './components/SendMsgBtn'
import Story from '../Stories/components/Story'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import UnblockUserBtn from './components/UnblockUserBtn'
import BlockUserBtn from './components/BlockUserBtn'
import ActivityStatusBar from './components/ActivityStatusBar'
import ProfilePfp from './components/ProfilePfp';
import EditPfpMenu from './components/Settings/Account settings/EditPfpMenu'
import './components/Settings/Account settings/style.css'
import AddMediaBtnPf from './components/Buttons/AddMediaBtnPf';

const ProfileTopBox = ({myprofile, user, isBlockedCB}) => {
    const [openStory, setOpenStory] = useState(false)
    const [pfpMenu, setPfpMenu] = useState(false)
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const userLS = JSON.parse(localStorage.getItem('user'))
    const [blockBtn, setBlockBtn] = useState(false)
    const {loading, error, data, refetch} = useQuery(FETCH_INFO, {
        variables: {
            userID: myprofile ? uid : user.userID,
            blockerId: uid
        }
    })

    useEffect(()=>{
        if(!loading){
            isBlockedCB(data?.if_user_blocked)
        }
        return
    }, [data, isBlockedCB, loading])

    const setStoryCallback = useCallback(val=>{
        setOpenStory(val)
    }, [setOpenStory])

    const changePfpMenu = useCallback(val => {
        setPfpMenu(val)
    }, [setPfpMenu])
    
    if(error) throw error

    const info = {
        user: user,
        followers: data?.get_followers,
        following: data?.get_following,
    }

    return (
        <>
            <div className="profile-top-box">
                <div className='pf-pfp-box'>
                    {myprofile && <AddMediaBtnPf setPfpMenu={changePfpMenu} refetch={refetch}/>}
                    <ProfilePfp length={data?.get_user_stories?.length}
                                blockedUser={data?.if_user_blocked}
                                pfp={user?.profile_picture}
                                openStory={setStoryCallback}/>
                </div>

                {!loading && <ProfileInfo 
                                info={info} 
                                last_seen={user.last_seen} 
                                mystatus={userLS?.status}
                                blocked={data?.if_user_blocked}
                                noOfPosts={data?.no_of_posts}
                            />}

                {(!loading && !data?.if_user_blocked) && (myprofile ? <ProfileEditBtn/> : (
                <>
                    <ProfileFollowBtn userID={user?.userID}/>
                    <SendMsgBtn userID={user?.userID}/>
                </>
                ))} 

                {data?.if_user_blocked && <UnblockUserBtn blockedId={user.userID}/>}

                {(!myprofile && !data?.if_user_blocked) && <FontAwesomeIcon icon='ellipsis-v' className='ptb-menu-btn' onClick={()=>setBlockBtn(!blockBtn)}/>}

                {(blockBtn && !data?.if_user_blocked) && <BlockUserBtn userID={user.userID}/>}
                
                {(!data?.if_user_blocked && userLS?.status && user?.show_status) 
                    && <ActivityStatusBar last_seen={user.last_seen}/>}
            </div>
            
            {(!loading && openStory) && <Story 
                allData={{
                    user: user,
                    stories: data?.get_user_stories
                }} 
                i={0} 
                isProfile={true}
                closeStoryCallback={setStoryCallback}
                />}
            {pfpMenu && <EditPfpMenu closeMenu={changePfpMenu} uid={uid}/>}
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
        no_of_posts(userID: $userID)

    }`