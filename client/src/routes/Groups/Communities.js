import React, { lazy } from 'react'
import {Route} from 'react-router-dom'
import GroupSettingsRoutes from './Settings/GroupSettingsRoutes'

const Group = lazy(()=>import('./Group'))
const CommunityChat = lazy(()=>import('./CommunityChat'))
const Groups = lazy(()=>import('./Groups'))
const GroupMembers = lazy(()=>import('./GroupMembers'))
const SavedCommunityPosts = lazy(()=>import('./SavedCommunityPosts'))
const CommunityInfo = lazy(()=>import('./CommunityInfo'))

const Communities = () => {
    return (
      <>
        <Route exact path='/communities'><Groups/></Route>
        <Route exact path='/community/:groupid'><Group/></Route>
        <Route exact path='/community/:groupid/chat'><CommunityChat/></Route>
        <Route exact path='/community/:groupid/members'><GroupMembers/></Route>          
        <Route exact path='/community/:groupid/saved'><SavedCommunityPosts/></Route>            
        <Route exact path='/community/:groupid/info'><CommunityInfo/></Route>    

        <GroupSettingsRoutes/> 
      </>
    )
}

export default Communities