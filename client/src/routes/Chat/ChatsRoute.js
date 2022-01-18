import React, {lazy} from 'react'
import { Route } from 'react-router-dom'

const Chats = lazy(()=>import('./Chats'))

const ChatsRoute = () => {

    return (
        <>
            <Route exact path='/chats'><Chats/></Route>
            <Route exact path='/chat/:curr_user/:user'><Chats chatMsgBox={true}/></Route>
            <Route exact path='/chat/group/:chatid'><Chats isGroupChat={true}/></Route>
        </>
    )
}

export default ChatsRoute
