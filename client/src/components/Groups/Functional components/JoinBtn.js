import React, { useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo'


const JoinBtn = ({info, user, updatedCallback}) => {
    const [state, setState] = useState('JOIN')
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading, refetch} = useQuery(IF_REQUESTED, {
        variables:{
            gid: info.groupID,
            uid: ls.userID
        }
    })
    const [leave_group] = useMutation(LEAVE)
    const [join_group] = useMutation(JOIN)
    const [request] = useMutation(REQUEST)
    const [remove_request] = useMutation(REMOVE_REQUEST)


    useEffect(()=>{
        if(data?.if_requested?.userID===ls.userID && data?.if_requested?.groupID===info.groupID){
            setState('REQUESTED')
        } else if(user) setState('LEAVE')
    }, [data])

    if(loading) return <p>loading</p>


    const handleJoin = () => {
        join_group({
            variables:{
                uid: ls.userID,
                gid: info.groupID
            }
        }).then(()=>{setState('LEAVE');updatedCallback(true)})
    }

    const handleLeave = () => {
        leave_group({
            variables:{
                uid: ls.userID,
                gid: info.groupID
            }
        }).then(()=>{setState('JOIN');updatedCallback(true)})
    }

    const handleRequest = () => {
        if(data?.if_requested?.userID===ls.userID && data?.if_requested?.groupID===info.groupID){
            remove_request({
                variables:{
                    uid: ls.userID,
                    gid: info.groupID
                }
            }).then(()=>{setState('JOIN');updatedCallback(true);refetch()})
        } else {
            request({
                variables:{
                    uid: ls.userID,
                    gid: info.groupID
                }
            }).then(()=>{setState('REQUESTED');updatedCallback(true);refetch()})
        }
    }

    return (
        <button 
            className='group-join-btn btn'
            onClick={()=>{
                if(user) handleLeave()
                else if (!user && info.closed) handleRequest()
                else if (!user && !info.closed) handleJoin()
            }}
            >
            {state}
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