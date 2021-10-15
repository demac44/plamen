import React, {useState, useEffect} from 'react'
import {gql }from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useSelector } from 'react-redux';



const PFP_QUERY = gql`
    query user($userID:Int!){
        user(userID: $userID){
            profile_picture
        }
    }
`
const Avatar = () => {
    const user = useSelector(state => state.isAuth.user)
    
    const {data, loading, error} = useQuery(PFP_QUERY, {
        variables: {userID: user.userID}
    })

    if (loading) return 'loading'
    if (error) return error

    return (
        <div className="tn-avatar">
            <img src={data.user.profile_picture} alt="avatar" className="avatar-img"/>
        </div>
    )
}

export default Avatar
