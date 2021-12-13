import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const ProfileFollowBtn = ({userID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [isFollowing, setIsFollowing] = useState(false) 
    const [follow] = useMutation(FOLLOW)
    const [unfollow] = useMutation(UNFOLLOW)
    const [follow_notification] = useMutation(FOLLOW_NOTIFICATION)

    const {loading, data} = useQuery(IF_FOLLOWING,{
        variables: {followerID: ls.userID, followedID: userID}
    })
    
    useEffect(()=>{ 
        setIsFollowing(data?.ifFollowing) 
        return
    }, [data])
    
    
    if (loading) return <p></p>



    const handleFollow = () => {
        follow({
            variables: {
                followerID: ls.userID,
                followedID: userID
            }
        })
        .then(()=>setIsFollowing(true))
        .then(()=>follow_notification({
            variables:{
                rid: userID,
                sid: ls.userID
            }
        }))
    }

    const handleUnfollow = () => {
        unfollow({
            variables: {
                followerID: ls.userID,
                followedID: userID
            }
        }).then(()=>setIsFollowing(false))
    }
    return (
        <div className='profile-top-box-buttons btn'
            onClick={() => isFollowing ? handleUnfollow() : handleFollow()}>
            <p>{isFollowing ? 'Unfollow' : 'Follow'}</p> 
        </div>
    )
}

export default ProfileFollowBtn 


const FOLLOW = gql`
    mutation ($followerID: Int!, $followedID: Int!){
        follow(followerID: $followerID, followedID: $followedID){
            followerID
            followedID
        }
    }
`
const UNFOLLOW = gql`
    mutation ($followerID: Int!, $followedID: Int!){
        unfollow(followerID: $followerID, followedID: $followedID){
            followerID
            followedID
        }
        remove_follow_notif(sender_id: $followerID, receiver_id: $followedID) {
            receiver_id
        }
    }
`
const IF_FOLLOWING = gql`
    query ($followerID: Int!, $followedID: Int!){
        ifFollowing(followerID: $followerID, followedID: $followedID)
    }
`
const FOLLOW_NOTIFICATION = gql`
    mutation ($rid: Int!, $sid: Int!){
        follow_notification(receiver_id: $rid, sender_id: $sid){
            receiver_id
        }
    }
`