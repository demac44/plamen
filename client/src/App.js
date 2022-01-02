import React, { useEffect, Suspense, lazy } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import './General.css'

import Feed from './routes/Feed/Feed'
import Profile from './routes/Profile/Profile';
import MainLoader from './components/General components/Loaders/MainLoader';

import { authenticate } from './Redux-actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import {gql} from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo';
import axios from 'axios';

const Group = lazy(()=>import('./routes/Groups/Group'))
const CommunityChat = lazy(()=>import('./routes/Groups/CommunityChat'))
const Groups = lazy(()=>import('./routes/Groups/Groups'))
const GroupMembers = lazy(()=>import('./routes/Groups/GroupMembers'))
const Explore = lazy(()=>import('./routes/Explore/Explore'))
const Chats = lazy(()=>import('./routes/Chat/Chats'))
const Saved = lazy(()=>import('./routes/Profile/Saved'))
const NotFound = lazy(()=>import('./routes/Not found/NotFound'))
const SinglePost = lazy(()=>import('./routes/Post/SinglePost'))
const Search = lazy(()=>import('./routes/Search/Search'))
const AccountSettings = lazy(()=>import('./routes/Profile/Settings/AccountSettings'))
const Settings = lazy(()=>import('./routes/Profile/Settings/Settings'))
const UserInfo = lazy(()=>import('./routes/Profile/Settings/UserInfo'))
const BlockedUsers = lazy(()=>import('./routes/Profile/Settings/BlockedUsers'))
const GroupSettings = lazy(()=>import('./routes/Groups/Settings/GroupSettings'))
const GroupEditInfo = lazy(()=>import('./routes/Groups/Settings/GroupEditInfo'))
const ManagePosts = lazy(()=>import('./routes/Groups/Settings/ManagePosts'))
const JoinRequests = lazy(()=>import('./routes/Groups/Settings/JoinRequests'))
const ManageUsers = lazy(()=>import('./routes/Groups/Settings/ManageUsers'))
const SavedCommunityPosts = lazy(()=>import('./routes/Groups/SavedCommunityPosts'))


import('@fortawesome/free-solid-svg-icons').then(i=>{
    import('@fortawesome/fontawesome-svg-core').then(core =>{
      core.library.add(i.faNewspaper, i.faCompass, i.faBookmark, i.faUsers, i.faPlay, i.faPlus, i.faInbox, 
        i.faSortDown, i.faHome, i.faBriefcase, i.faUniversity, i.faSchool, i.faBirthdayCake, 
        i.faMobileAlt, i.faHeart, i.faComment, i.faUser, i.faTrashAlt, i.faEllipsisV, i.faArrowLeft,
        i.faTimes,i.faImages, i.faVideo, i.faShare, i.faFlag, i.faChevronRight, i.faSearch, i.faUserCog, i.faInfoCircle,
        i.faPhone, i.faIcons, i.faLock, i.faLockOpen, i.faCommentDots, i.faCogs, i.faCamera, i.faRedo, i.faChevronLeft)
      })
})

function App() {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state?.isAuth?.isAuth)
  const uid = useSelector(state => state?.isAuth?.user?.userID)
  const user = JSON.parse(localStorage.getItem('user'))  
  const token = localStorage.getItem('token')
  const [set_last_seen] = useMutation(SET_LAST_SEEN)
  
  const {data, loading} = useQuery(GET_FOLLOW_SUGGESTIONS, {
    variables:{
      userID: uid
    }
  })

  useEffect(()=>{
    dispatch(authenticate())
    
    if(checkUser(getCookie(isLogged), user)){
      return logout()
    } else {
        if(data?.get_user_suggestions){
          // setInterval(()=>{
        //   set_last_seen({variables:{userID: uid}})
        // }, 120000)
        localStorage.setItem('user-suggestions', JSON.stringify(data?.get_user_suggestions))
        }
    }
  },[isLogged, user, uid, token, data, dispatch])
  
  // <div onFocus={()=>set_last_seen({variables:{userID: uid}})}>
  return (
      <div>
        {(loading) ? <MainLoader/> :
          <Switch>
            <Route exact path='/'>{isLogged ? <Feed isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
            <Route exact path='/profile/:username'>{isLogged ? <Profile isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
            <Suspense fallback={<MainLoader/>}>
              <Route exact path='/saved'>{isLogged ? <Saved isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/explore'>{isLogged ? <Explore isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/search/:query'>{isLogged ? <Search isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/post/:postid'><SinglePost isLogged={isLogged}/></Route>
              <Route exact path='/404'>{isLogged ? <NotFound/> : <Redirect to='/login'/>}</Route>
              {/* profile */}
              <Route exact path='/settings'>{isLogged ? <Settings isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/settings/account'>{isLogged ? <AccountSettings isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/settings/info'>{isLogged ? <UserInfo isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/settings/blocked_users'>{isLogged ? <BlockedUsers isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              {/* chats */}
              <Route exact path='/chats'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chat/:chatid'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chat/group/:chatid'>{isLogged ? <Chats isLogged={isLogged} isGroupChat={true}/> : <Redirect to='/login'/>}</Route>
              {/* communities */}
              <Route exact path='/communities'>{isLogged ? <Groups isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid'>{isLogged ? <Group isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/chat'>{isLogged ? <CommunityChat isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/members'>{isLogged ? <GroupMembers isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings'>{isLogged ? <GroupSettings isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings/edit_info'>{isLogged ? <GroupEditInfo isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings/manage_posts'>{isLogged ? <ManagePosts isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings/join_requests'>{isLogged ? <JoinRequests isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings/manage_users'>{isLogged ? <ManageUsers isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>            
              <Route exact path='/community/:groupid/saved'>{isLogged ? <SavedCommunityPosts isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>            
            </Suspense>
          </Switch>}
      </div>
  );
}

export default App;

const checkUser = (token, user) => {
  if(!token || !user) return true
  return false
}

function getCookie() {
    const cookie = document?.cookie?.split('; ')?.find(row => row.startsWith('x-auth-token='))?.split('=')[1];
    return cookie
}

const logout = async () => {
  await axios({
      method:'post',
      url:'http://localhost:8000/api/logout',
      withCredentials: true
  }).then(()=>{
      localStorage.clear()
      window.location.href = '/login'
  })
}


const GET_FOLLOW_SUGGESTIONS = gql`
  query ($userID: Int) {
    get_user_suggestions (userID: $userID){
      first_name
      last_name
      username
      userID
      profile_picture
    }
  }
`

const SET_LAST_SEEN = gql`
  mutation ($userID: Int!){
    set_last_seen (userID: $userID){
      userID
    }
  }

`