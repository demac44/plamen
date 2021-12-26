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

import('@fortawesome/free-solid-svg-icons').then(i=>{
  import('@fortawesome/fontawesome-svg-core').then(core =>{
    core.library.add(i.faNewspaper, i.faCompass, i.faBookmark, i.faUsers, i.faPlay, i.faPlus, i.faInbox, 
      i.faSortDown, i.faHome, i.faBriefcase, i.faUniversity, i.faSchool, i.faBirthdayCake, 
      i.faMobileAlt, i.faHeart, i.faComment, i.faUser, i.faTrashAlt, i.faEllipsisV, i.faArrowLeft,
      i.faTimes,i.faImages, i.faVideo, i.faShare, i.faFlag, i.faChevronRight, i.faSearch, i.faUserCog, i.faInfoCircle,
      i.faPhone, i.faIcons, i.faLock)
    })
})

const Group = lazy(()=>import('./routes/Groups/Group'))
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
const GroupSettings = lazy(()=>import('./routes/Groups/Settings/GroupSettings'))
const GroupEditInfo = lazy(()=>import('./routes/Groups/Settings/GroupEditInfo'))
const ManagePosts = lazy(()=>import('./routes/Groups/Settings/ManagePosts'))


function App() {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state?.isAuth.isAuth)
  const uid = useSelector(state => state.isAuth.user?.userID)
  const user = JSON.parse(localStorage.getItem('user'))  
  const token = localStorage.getItem('token')
  const [set_last_seen] = useMutation(SET_LAST_SEEN)
  
  const {data, loading} = useQuery(GET_FOLLOW_SUGGESTIONS, {
    skip: user?.userID ? false : true,
    variables:{
      userID: user?.userID
    }
  })

  useEffect(()=>{
    dispatch(authenticate())
    
    if(checkUser(token, user, uid)){
      localStorage.clear()
    } else {
      if(data?.get_user_suggestions){
        // setInterval(()=>{
        //   set_last_seen({variables:{userID: user.userID}})
        // }, 30000)
          localStorage.setItem('user-suggestions', JSON.stringify(data?.get_user_suggestions))
      }
    }
  },[isLogged, user, uid, token, data, dispatch])
  
  // onFocus={()=>set_last_seen({variables:{userID: user.userID}})}
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
              {/* chats */}
              <Route exact path='/chats'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chat/:chatid'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chat/group/:chatid'>{isLogged ? <Chats isLogged={isLogged} isGroupChat={true}/> : <Redirect to='/login'/>}</Route>
              {/* communities */}
              <Route exact path='/communities'>{isLogged ? <Groups isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid'>{isLogged ? <Group isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/members'>{isLogged ? <GroupMembers isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings'>{isLogged ? <GroupSettings isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings/edit_info'>{isLogged ? <GroupEditInfo isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/settings/manage_posts'>{isLogged ? <ManagePosts isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
            </Suspense>
          </Switch>}
      </div>
  );
}

export default App;

const checkUser = (token, user, uid) => {
  if(!token) return true
  else if(!user) return true
  else if (uid && user.userID !== uid){
    return true
  }
  return false
}


const GET_FOLLOW_SUGGESTIONS = gql`
  query ($userID: Int!) {
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