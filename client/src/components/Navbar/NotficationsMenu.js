import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux';

import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'
import NotificationBox from './NotificationBox'


const NotficationsMenu = ({visible}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [clear_notifications] = useMutation(CLEAR_NOTIFICATIONS)
    const notifications = useQuery(GET_NOTIFICATIONS, {
        variables:{
            uid
        }
    })
    
    useEffect(()=>{ 
        const subscribeNewNotification = () => {
            return notifications?.subscribeToMore({
                document: NOTIFICATION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newNotification = subscriptionData.data.newNotification;
                    
                    if (newNotification?.receiver_id===uid){
                        return Object.assign({}, prev, {
                            get_notifications: [newNotification, ...prev.get_notifications]
                        });
                    }
            }});
        }
        return subscribeNewNotification()
    }, [notifications, uid]) 
    
    
    const handleClear = () => {
        clear_notifications({
            variables:{
                rid: uid
            }
        }).then(()=>notifications?.refetch())
    }
    
    return (
        <div className='notifications-container' style={{visibility:visible}}>
                {notifications?.loading ? <div className='flex-ctr' style={{height:'100px'}}><div className='small-spinner'></div></div> 
                : <>
                    {(notifications?.data?.get_notifications?.length) < 1 && <p style={{
                        width:'100%',
                        textAlign:'center',
                        padding:'20px',
                        color:'white'
                    }}>No new notifications</p>}
                    

                    <span>
                        {(notifications?.data?.get_notifications?.length > 0) && 
                        <div
                        style={{
                            width:'100%',
                            padding:'5px 10px 0 0',
                            textAlign:'end',
                            cursor:'pointer',
                            color:'teal',
                            fontSize:'14px'
                        }}
                        onClick={handleClear}
                        >Clear all</div>}
                        {notifications?.data?.get_notifications?.map(notif => 
                            <NotificationBox notif={notif} key={notif.Nid}/>
                            )}
                    </span>
            </>}
        </div>
    )
}

export default memo(NotficationsMenu)

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
    mutation ($rid: Int){
        clear_notifications (receiver_id: $rid){
            receiver_id
        }
    }
`
const NOTIFICATION = gql`
    subscription {
        newNotification {
            receiver_id
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