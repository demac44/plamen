import React, { useEffect } from 'react'
import {gql} from 'graphql-tag'
import {useQuery} from 'react-apollo'
import PostCount from '../Feed/Posts/Post components/UI/PostCount'


const COUNT_POSTS = gql`
    query count_posts($userID: Int!){
        count_posts(userID: $userID)
    }
`

const ProfileInfo = () => {
    let ls = JSON.parse(localStorage.getItem('user')) 

    const {loading, data, refetch} = useQuery(COUNT_POSTS, {
        variables: {userID: ls.userID}
    })

    useEffect(()=>{
        refetch()
    },[data])

    if(loading) return <p>loading</p> 
  
    return (
        <>
            <div className="pf-info">
                <h4 className="pf-name">{ls.fname+' '+ls.lname}</h4> 
                <h5 className="pf-tagname">@{ls.username}</h5>
                <div className="pf-stats">
                    <div>
                        <h6>Following</h6>
                        <p>124</p>
                    </div>
                    <div>
                        <h6>Followers</h6>
                        <p>32871</p>
                    </div>
                    <PostCount count={data?.count_posts}/>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo
