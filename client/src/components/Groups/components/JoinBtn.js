import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'


const JoinBtn = ({info, user}) => {
    const [state, setState] = useState('JOIN')
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [isLoading, setIsLoading] = useState(false)
    const {data, loading, refetch} = useQuery(IF_REQUESTED, {
        variables:{
            gid: info.groupID,
            uid: uid
        }
    })
    const [leave_group] = useMutation(LEAVE)
    const [join_group] = useMutation(JOIN)
    const [request] = useMutation(REQUEST)
    const [remove_request] = useMutation(REMOVE_REQUEST)


    useEffect(()=>{
        if(!loading && (data?.if_requested?.userID===uid && data?.if_requested?.groupID===info.groupID)){
            setState('REQUESTED')
        } else if(!loading && user) setState('LEAVE')
    }, [data, info.groupID, uid, user, loading])

    const handleJoin = () => {
        setIsLoading(true)
        setTimeout(()=>{
            join_group({
                variables:{
                    uid: uid,
                    gid: info.groupID
                }
            }).then(()=>{window.location.reload()})
        }, 1000)
    }

    const handleLeave = () => {
        setIsLoading(true)
        setTimeout(()=>{
            leave_group({
                variables:{
                    uid: uid,
                    gid: info.groupID
                }
            }).then(()=>{window.location.reload()})
        }, 1000)
    }

    const handleRequest = () => {
        setIsLoading(true)
        if(data?.if_requested?.userID===uid && data?.if_requested?.groupID===info.groupID){
            setTimeout(()=>{
                remove_request({
                    variables:{
                        uid: uid,
                        gid: info.groupID
                    }
                }).then(()=>{setState('JOIN');refetch();setIsLoading(false)})
            }, 1000)
        } else {
            setTimeout(()=>{
                request({
                    variables:{
                        uid: uid,
                        gid: info.groupID
                    }
                }).then(()=>{setState('REQUESTED');refetch();setIsLoading(false)})
            }, 1000)
        }
    }

    return (
        <button 
            className='group-join-btn btn flex-ctr'
            onClick={()=>{
                if(!loading){
                    if(user) handleLeave()
                    else if (!user && info.closed) handleRequest()
                    else if (!user && !info.closed) handleJoin()
                }
            }}
            >
            {(isLoading || loading) ? <div className='tiny-spinner'></div> : state}
        </button>
    )
}

export default JoinBtn


const JOIN = gql`
    mutation ($uid: Int!, $gid: Int!){
        join_group(userID: $uid, groupID: $gid){
            groupID
        }
    }
`
const LEAVE = gql`
    mutation ($uid: Int!, $gid: Int!){
        leave_group(userID: $uid, groupID: $gid){
            groupID
        }
    }
`
const REQUEST = gql`
    mutation ($uid: Int!, $gid: Int!){
        join_request (userID: $uid, groupID: $gid){
            groupID
        }
    }
`
const REMOVE_REQUEST = gql`
    mutation ($uid: Int!, $gid: Int!){
        remove_request (userID: $uid, groupID: $gid){
            groupID
        }
    }
`
const IF_REQUESTED = gql`
    query ($uid: Int!, $gid: Int!){
        if_requested (userID: $uid, groupID: $gid){
            groupID
            userID
        }
    }
`