import React, {lazy} from 'react'
import { Route } from 'react-router-dom'
import GroupChats from './GroupChats'

const Chats = lazy(()=>import('./Chats'))

const ChatsRoute = () => {

    return (
        <>
            <Route exact path='/chats'><Chats/></Route>
            <Route exact path='/chat/:curr_user/:user'><Chats/></Route>
            <Route exact path='/group_chat/:chatid'><GroupChats/></Route>
        </>
    )
}

export default ChatsRoute
