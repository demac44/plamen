import React from 'react'
import {gql }from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useSelector } from 'react-redux';


const USER_QUERY = gql`
    query user($userID:Int!){
        user(userID: $userID){
            first_name
            last_name
            username
        }
    }
`
const ProfileInfo = () => {
    const user = useSelector(state => state.isAuth.user)

    const {data, loading, error} = useQuery(USER_QUERY, {
        variables: {userID: user.userID}
    })

    if (loading) return 'loading'
    if (error) return error

    return (
        <div className="pf-info">
            <h4 className="pf-name">{data.user.first_name+' '+data.user.last_name}</h4>
            <h5 className="pf-tagname">@{data.user.username}</h5>
            <div className="pf-stats">
                <div>
                    <h6>Following</h6>
                    <p>124</p>
                </div>
                <div>
                    <h6>Followers</h6>
                    <p>32871</p>
                </div>
                <div>
                    <h6>Posts</h6>
                    <p>242</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
