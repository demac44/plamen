import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import '../../components/Chat/Chat.css'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo';
import { useSelector } from 'react-redux'
import GroupChat from './GroupChat'
import { Redirect, useLocation } from 'react-router-dom'
 
const GroupChats = () => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const {state} = useLocation()

    useEffect(()=>{
        set_last_seen({variables:{userID: uid}})
    }, [set_last_seen, uid])

    if(!state) return <Redirect to='/chats'/>

    return (
        <div className='wrapper-chat'>
            <Navbar/>
            <AlternativeNavbar chat={true}/>
            <div className='wrapper'>
                <div className='container-chat'>
                    <GroupChat/>
                </div>
            </div>
        </div>
    )
}

export default GroupChats

const SET_LAST_SEEN = gql`
  mutation ($userID: Int){
    set_last_seen (userID: $userID){
      userID
    }
  }

`