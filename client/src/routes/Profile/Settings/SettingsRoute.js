import React, {lazy} from 'react'
import { Route } from 'react-router-dom'

const AccountSettings = lazy(()=>import('./AccountSettings'))
const Settings = lazy(()=>import('./Settings'))
const UserInfo = lazy(()=>import('./UserInfo'))
const BlockedUsers = lazy(()=>import('./BlockedUsers'))

const SettingsRoute = () => {
    return (
        <>
            <Route exact path='/settings'><Settings/></Route>
            <Route exact path='/settings/account'><AccountSettings/></Route>
            <Route exact path='/settings/info'><UserInfo/></Route>
            <Route exact path='/settings/blocked_users'><BlockedUsers/></Route>
        </>
    )
}

export default SettingsRoute
