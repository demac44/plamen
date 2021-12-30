import React from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import UserBox from '../../../../../General components/Users list/UserBox'
import { useSelector } from 'react-redux'


const LikesList = ({postID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {data, loading} = useQuery(GET_LIKES_GP, {
        variables:{
            postID,
            limit: 20,
            offset:0,
            uid
        }
    })

    return (
        <div className='likes-list flex-col-ctr'>
            <div className='likes-list-box'>
                <div className='users-list-top-bar'>
                    {!loading && <p style={styles.title}>{data?.get_group_post_likes?.length} Likes</p>}
                </div>
                
                {loading ? <div style={{width:'100%', height:'150px'}} className='flex-ctr'><div className='small-spinner'></div></div> :
                <div>
                    {(data.get_group_post_likes.length === 0) && <p style={styles.emptyList}>No likes</p>}
                    {data.get_group_post_likes.map(user => <UserBox user={user} key={user.userID}/>)}
                </div>
                }
            </div>
        </div>
    )
}

export default LikesList


const styles = {
    closeBtn:{
        position:'absolute',
        right:'10px',
        top:'7px',
        fontSize:'30px',
        color:'white',
        cursor:'pointer'
    },
    emptyList:{
        width:'100%',
        color:'white',
        textAlign:'center',
        padding:'20px'
    },
    title:{
        color:'white', 
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'18px'
    }
}

const GET_LIKES_GP = gql`
    query($postID: Int!, $limit: Int, $offset: Int, $uid: Int!){
        get_group_post_likes(postID: $postID, limit: $limit, offset: $offset, userID: $uid){
            first_name
            last_name
            profile_picture
            userID
            username
    }
}
`