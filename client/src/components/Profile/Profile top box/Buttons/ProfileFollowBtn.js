import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { useSelector } from 'react-redux';

const ProfileFollowBtn = ({userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [isFollowing, setIsFollowing] = useState(false) 
    const [follow] = useMutation(FOLLOW)
    const [unfollow] = useMutation(UNFOLLOW)
    const [follow_notification] = useMutation(FOLLOW_NOTIFICATION)
    const [isLoading, setIsLoading] = useState(false)

    const {loading, data, error} = useQuery(IF_FOLLOWING,{
        variables: {followerID: uid, followedID: userID}
    })
    
    useEffect(()=>{ 
        return setIsFollowing(data?.ifFollowing) 
    }, [data])
    

    const handleFollow = () => {
        setIsLoading(true)
        setTimeout(()=>{
            follow({
                variables: {
                    followerID: uid,
                    followedID: userID
                }
            })
            .then(()=>setIsFollowing(true))
            .then(()=>follow_notification({
                variables:{
                    rid: userID,
                    sid: uid
                }
            })).then(()=>setIsLoading(false))
        }, 500)
    }

    const handleUnfollow = () => {
        setIsLoading(true)
        setTimeout(()=>{
            unfollow({
                variables: {
                    followerID: uid,
                    followedID: userID
                }
            }).then(()=>setIsFollowing(false)).then(()=>setIsLoading(false))
        },500)
    }

    if(error) throw error
    return (
        <div className='profile-top-box-buttons btn flex-ctr'
            onClick={() => !loading && (isFollowing ? handleUnfollow() : handleFollow())}>
            <p>{(isLoading || loading) ? <div className='tiny-spinner'></div> : (isFollowing ? 'Unfollow' : 'Follow')}</p> 
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