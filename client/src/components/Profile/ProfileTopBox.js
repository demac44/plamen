import React, { useCallback, useState, memo } from 'react'
import ProfileFollowBtn from './components/ProfileFollowBtn'
import ProfileEditBtn from './components/ProfileEditBtn'
import ProfileInfo from './ProfileInfo'
import SendMsgBtn from './components/SendMsgBtn'
import Avatar from '../General components/Avatar'
import Story from '../Stories/components/Story'

import {useParams} from 'react-router-dom'

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const ProfileInfoBox = ({userID, myprofile, postsLength}) => {
    const [openStory, setOpenStory] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user')) 

    const {username} = useParams()

    const getUser = useQuery(GET_USER, {
        variables: {username: username},
        skip: myprofile
    })

    const {loading, error, data} = useQuery(FETCH_INFO, {
        variables: {
            userID: myprofile ? ls.userID : userID,
        }
    })

    const closeStoryCallback = useCallback(()=>{
        setOpenStory(false)
    }, [setOpenStory])

    if(loading) return <p>loading</p>
    if(error) throw error

    const info = {
        user: myprofile ? ls : getUser?.data?.get_user,
        followers: data.get_followers,
        following: data.get_following,
        postsLength
    }


    return (
        <>
            <div className="profile-top-box">
                <div style={{border: data.get_user_stories.length>0 && '3px solid #ffbb00', borderRadius:'50%'}} onClick={()=>{
                    data.get_user_stories.length>0 && setOpenStory(true)
                }}>
                    <Avatar size='170px' image={info.user.profile_picture}/>
                </div>
                <ProfileInfo info={info}/>
                {myprofile ? <ProfileEditBtn/> : (
                <>
                    <ProfileFollowBtn userID={info?.user?.userID}/>
                    <SendMsgBtn userID={info?.user?.userID}/>
                </>
                )} 
            </div>
            {openStory && <Story 
                allData={{
                    user: info.user,
                    stories: data.get_user_stories
                }} 
                i={0} 
                isProfile={true}
                closeStoryCallback={closeStoryCallback}
                />}
        </>
    )
}

export default memo(ProfileInfoBox)


const FETCH_INFO= gql`
    query ($userID: Int!){
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
    }`

const GET_USER = gql`
    query ($username: String!){
        get_user(username:$username){
            first_name
            last_name
            profile_picture
            username
            userID
        }
    }
`