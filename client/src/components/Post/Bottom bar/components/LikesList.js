import React from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import UserBox from '../../../General components/Users list/UserBox'

const LikesList = ({postID, closeList}) => {
    const {data, loading} = useQuery(GET_LIKES, {
        variables:{
            postID,
            limit: 20,
            offset:0
        }
    })

    return (
        <div className='likes-list flex-col-ctr'>
            <div className='likes-list-box'>
                <div className='users-list-top-bar'>
                    <h2 style={{color:'white', backgroundColor:'#2f2f2f'}}>Likes</h2>
                    <i onClick={()=>closeList()} style={styles.closeBtn} className='fas fa-times'></i>
                </div>
                
                {loading ? <div style={{width:'100%', height:'150px'}} className='flex-ctr'><div className='small-spinner'></div></div> :
                <div>
                    {(data.get_post_likes.length === 0) && <p style={styles.emptyList}>No likes</p>}
                    {data.get_post_likes.map(user => <UserBox user={user} key={user.userID}/>)}
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
    }
}

const GET_LIKES = gql`
    query($postID: Int!, $limit: Int, $offset: Int){
        get_post_likes(postID: $postID, limit: $limit, offset: $offset){
            first_name
            last_name
            profile_picture
            userID
            username
    }
}
`