import React from 'react'

import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
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
            sender_id
        }
    }
`

const CLEAR_NOTIFICATIONS = gql`
    mutation ($rid: Int!){
        clear_notifications (receiver_id: $rid){
            receiver_id
        }
    }
`

const NotficationsMenu = ({visible}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [clear_notifications] = useMutation(CLEAR_NOTIFICATIONS)
    const {data, loading, refetch} = useQuery(GET_NOTIFICATIONS, {
        variables:{
            uid: ls.userID
        }
    })

    const handleClear = () => {
        clear_notifications({
            variables:{
                rid: ls.userID
            }
        }).then(()=>refetch())
    }

    if(loading) return <p>loading</p>

    return (
        <div className='notifications-container' style={{visibility:visible}}>
            {data.get_notifications.length < 1 && <p style={{
                width:'100%',
                textAlign:'center',
                padding:'20px'
            }}>No new notifications</p>}
            
            {data.get_notifications.length > 0 && <div
                style={{
                    width:'100%',
                    padding:'5px 10px 0 0',
                    textAlign:'end',
                    cursor:'pointer',
                    backgroundColor:'white',
                    color:'teal',
                    fontSize:'14px'
                }}
                onClick={handleClear}
                >Clear all</div>}

            <span>
                {data?.get_notifications?.map(n => 
                    <NotificationBox n={n} key={n.Nid}/>
                    )}
            </span>

            {data.get_notifications.length > 0 && <div 
                style={{
                    width:'100%',
                    padding:'3px',
                    textAlign:'center',
                    cursor:'pointer',
                    backgroundColor:'#ececec',
            }}><h5>See all</h5></div>}
        </div>
    )
}

export default NotficationsMenu
