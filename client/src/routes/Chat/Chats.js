import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Chat from './Chat'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import '../../components/Chat/Chat.css'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo';
import { useSelector } from 'react-redux'
 
const ChatCont = ({isGroupChat}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [set_last_seen] = useMutation(SET_LAST_SEEN)

    useEffect(()=>{
        set_last_seen({variables:{userID: uid}})
    }, [set_last_seen, uid])

    return (
        <div className='wrapper-chat'>
            <Navbar/>
            <AlternativeNavbar chat={true}/>
            <div className='wrapper'>
                <div className='container-chat'>
                    <Chat isGroupChat={isGroupChat}/>
                </div>
            </div>
        </div>
    )
}

export default ChatCont

const SET_LAST_SEEN = gql`
  mutation ($userID: Int){
    set_last_seen (userID: $userID){
      userID
    }
  }

`