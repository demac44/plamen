import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { parse } from 'dotenv'
import { useParams } from 'react-router'

const FOLLOW = gql`
    mutation ($followerID: Int!, $followedID: Int!){
        follow(followerID: $followerID, followedID: $followedID){
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

const FollowBtn = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [ifFollowing, setIsFollowing] = useState(false) 

    const {id} = useParams()

    let userID = parseInt(id)

    const [follow, {}] = useMutation(FOLLOW)

    const {loading, error, data, refetch} = useQuery(IF_FOLLOWING,{
        variables: {followerID: ls.userID, followedID: userID}
    })

    useEffect(()=>{ 
        refetch()
    }, [data])
    
    if (loading) return <p>loading</p>


    const handleFollow = () => {
        follow({
            variables: {
                followerID: ls.userID,
                followedID: userID
            }
        }).then(()=>setIsFollowing(true))
    }
    return (
        <div className="pf-edit-follow-btn" style={{
            backgroundColor: data.ifFollowing ? '#df7e00' : 'white',
            color: data.ifFollowing ? 'white' : '#df7e00',}} 

            onClick={handleFollow}>
            <p>{data.ifFollowing ? 'Unfollow' : 'Follow'}</p> 
        </div>
    )
}

export default FollowBtn 
