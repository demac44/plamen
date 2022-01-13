import React, {lazy} from 'react'
import { Route } from 'react-router-dom'

const GroupSettings = lazy(()=>import('./GroupSettings'))
const GroupEditInfo = lazy(()=>import('./GroupEditInfo'))
const ManagePosts = lazy(()=>import('./ManagePosts'))
const JoinRequests = lazy(()=>import('./JoinRequests'))
const ManageUsers = lazy(()=>import('./ManageUsers'))

const GroupSettingsRoutes = () => {
    return (
        <>
            <Route exact path='/community/:groupid/settings'><GroupSettings/></Route>
            <Route exact path='/community/:groupid/settings/edit_info'><GroupEditInfo/></Route>
            <Route exact path='/community/:groupid/settings/manage_posts'><ManagePosts/></Route>
            <Route exact path='/community/:groupid/settings/join_requests'><JoinRequests/></Route>
            <Route exact path='/community/:groupid/settings/manage_users'><ManageUsers/></Route>  
        </>
    )
}

export default GroupSettingsRoutes
