import React, { useEffect, Suspense, lazy, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import './General.css'

import Feed from './routes/Feed/Feed'
import Profile from './routes/Profile/Profile';
import MainLoader from './components/General components/Loaders/MainLoader';

import { authenticate } from './Redux-actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo';
import axios from 'axios';

const Explore = lazy(()=>import('./routes/Explore/Explore'))
const Chats = lazy(()=>import('./routes/Chat/Chats'))
const Saved = lazy(()=>import('./routes/Saved/Saved'))
const NotFound = lazy(()=>import('./routes/Not found/NotFound'))
const SinglePost = lazy(()=>import('./routes/Post/SinglePost'))
const Search = lazy(()=>import('./routes/Search/Search'))
const AccountSettings = lazy(()=>import('./routes/Profile/Settings/AccountSettings'))
const Settings = lazy(()=>import('./routes/Profile/Settings/Settings'))
const UserInfo = lazy(()=>import('./routes/Profile/Settings/UserInfo'))
const BlockedUsers = lazy(()=>import('./routes/Profile/Settings/BlockedUsers'))
const ConfirmEmail = lazy(()=>import('./routes/Confirm email/ConfirmEmail'))


function App() {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state?.isAuth?.isAuth)
  const uid = useSelector(state => state?.isAuth?.user?.userID)
  const user = JSON.parse(localStorage.getItem('user'))  
  const token = localStorage.getItem('token')
  const [set_last_seen] = useMutation(SET_LAST_SEEN)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    dispatch(authenticate())
    
    if(checkUser(getCookie(isLogged), user)){
      return logout()
    } else {
        uid && setInterval(()=>{
          set_last_seen({variables:{userID: uid}})
        }, 120000)
        setLoading(false)
    }
  },[isLogged, user, uid, token, dispatch, set_last_seen])
  
  return (
    <div>
        {loading ? <MainLoader/> :
          (isLogged ?
          <Switch>
            <Route exact path='/'>{<Feed isLogged={isLogged}/>}</Route>
            <Route exact path='/profile/:username'>{<Profile isLogged={isLogged}/>}</Route>
            <Suspense fallback={<MainLoader/>}>
              <Route exact path='/saved'>{<Saved isLogged={isLogged}/>}</Route>
              <Route exact path='/explore'>{<Explore isLogged={isLogged}/>}</Route>
              <Route exact path='/search/:query'>{<Search isLogged={isLogged}/>}</Route>
              <Route exact path='/post/:postid'><SinglePost isLogged={isLogged}/></Route>
              <Route exact path='/404'>{<NotFound/>}</Route>
              {/* profile */}
              <Route exact path='/settings'>{<Settings isLogged={isLogged}/>}</Route>
              <Route exact path='/settings/account'>{<AccountSettings isLogged={isLogged}/>}</Route>
              <Route exact path='/settings/info'>{<UserInfo isLogged={isLogged}/>}</Route>
              <Route exact path='/settings/blocked_users'>{<BlockedUsers isLogged={isLogged}/>}</Route>
              {/* chats */}
              <Route exact path='/chats'>{<Chats isLogged={isLogged}/>}</Route>
              <Route exact path='/chat/:chatid'>{<Chats isLogged={isLogged}/>}</Route>
              <Route exact path='/chat/group/:chatid'>{<Chats isLogged={isLogged} isGroupChat={true}/>}</Route>
              {/* confirm email */}
              <Route exact path='/verify_email'>{<ConfirmEmail isLogged={isLogged}/>}</Route>            
            </Suspense>
          </Switch> : <Redirect to='/login'/>)}
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


const SET_LAST_SEEN = gql`
  mutation ($userID: Int){
    set_last_seen (userID: $userID){
      userID
    }
  }

`