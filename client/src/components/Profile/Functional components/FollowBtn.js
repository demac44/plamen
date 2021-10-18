import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { useParams } from 'react-router'

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
    }
`


const IF_FOLLOWING = gql`
    query ($followerID: Int!, $followedID: Int!){
        ifFollowing(followerID: $followerID, followedID: $followedID)
    }
`

const FollowBtn = ({uID}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [isFollowing, setIsFollowing] = useState(false) 
    const [follow] = useMutation(FOLLOW)
    const [unfollow] = useMutation(UNFOLLOW)

    
    const {id} = useParams()
    
    let userID = parseInt(id)

    const {loading, data, refetch} = useQuery(IF_FOLLOWING,{
        variables: {followerID: ls.userID, followedID: userID || uID}
    })
    

    useEffect(()=>{ 
        refetch()
        setIsFollowing(data?.ifFollowing) 
    }, [data, refetch])
    
    
    if (loading) return <p>loading</p>



    const handleFollow = () => {
        follow({
            variables: {
                followerID: ls.userID,
                followedID: userID || uID
            }
        }).then(()=>setIsFollowing(true))
    }

    const handleUnfollow = () => {
        unfollow({
            variables: {
                followerID: ls.userID,
                followedID: userID || uID
            }
        }).then(()=>setIsFollowing(false))
    }
    return (
        <div className="pf-edit-follow-btn" style={{
            backgroundColor: isFollowing ? '#df7e00' : 'white',
            color: isFollowing ? 'white' : '#df7e00',}} 

            onClick={isFollowing ? handleUnfollow : handleFollow}>
            <p>{isFollowing ? 'Unfollow' : 'Follow'}</p> 
        </div>
    )
}

export default FollowBtn 
