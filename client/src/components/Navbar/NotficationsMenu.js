import React, { useEffect, useState } from 'react'
import Avatar from '../UI/Avatar'
import {Link} from 'react-router-dom'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import NotificationBox from './NotificationBox'

const GET_NOTIFICATIONS = gql`
    query($uid: Int!){
        get_notifications(receiver_id: $uid){
            Nid
            username
            profile_picture
            type
            postID
            time_sent
        }
    }
`

const NotficationsMenu = ({visible}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(GET_NOTIFICATIONS, {
        variables:{
            uid: ls.userID
        }
    })

    if(loading) return <p>loading</p>

    return (
        <div className='notifications-container' style={{visibility:visible}}>
            {data.get_notifications.length < 1 && <p style={{
                width:'100%',
                textAlign:'center',
                padding:'20px'
            }}>No new notifications</p>}
            
            {data?.get_notifications?.map(n => 
                <NotificationBox n={n} key={n.Nid}/>
            )}
            <div 
            style={{
                width:'100%',
                padding:'3px',
                textAlign:'center',
                cursor:'pointer',
                backgroundColor:'#ececec'
            }}><h5>See all</h5></div>
        </div>
    )
}

export default NotficationsMenu
