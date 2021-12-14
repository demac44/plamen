import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import './General.css'

import { authenticate } from './Redux-actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import Feed from './routes/Feed/Feed';
import Profile from './routes/Profile/Profile';
import AccountSettings from './routes/Profile/Settings/AccountSettings';
import Saved from './routes/Profile/Saved';
import Search from './routes/Search/Search';
import SinglePost from './routes/Post/SinglePost';
import Groups from './routes/Groups/Groups';
import Group from './routes/Groups/Group';
import GroupMembers from './routes/Groups/GroupMembers';
import Chats from './routes/Chat/Chats'
import Explore from './routes/Explore/Explore';
import MainLoader from './components/General components/Loaders/MainLoader';
import Settings from './routes/Profile/Settings/Settings';
import NotFound from './routes/Not found/NotFound';
import UserInfo from './routes/Profile/Settings/UserInfo';

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo';

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const isLogged = useSelector(state => state?.isAuth.isAuth)
  const uid = useSelector(state => state.isAuth.user?.userID)
  const user = JSON.parse(localStorage.getItem('user'))  
  const token = localStorage.getItem('token')

  const {data, loading} = useQuery(GET_FOLLOW_SUGGESTIONS, {
    variables:{
      userID: user.userID
    }
  })

  useEffect(()=>{
    setIsLoading(true)

    dispatch(authenticate())

    if(checkUser(token, user, uid)){
      localStorage.clear()
    } else {
      if(data?.get_user_suggestions){
        localStorage.setItem('user-suggestions', JSON.stringify(data?.get_user_suggestions))
      }
    }

    setIsLoading(false)
  },[isLogged, user, uid, token, data])
  
  return (
      <>
        {(isLoading || loading) ? <MainLoader/> :
          <Switch>
            <>
              <Route exact path='/'></Route>
              <Route exact path='/feed'>{isLogged ? <Feed isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/profile/:username'>{isLogged ? <Profile isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/saved'>{isLogged ? <Saved isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/search/:query'>{isLogged ? <Search isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chats'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chat/:chatid'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/post/:postid'><SinglePost isLogged={isLogged}/></Route>
              <Route exact path='/communities'>{isLogged ? <Groups isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid'>{isLogged ? <Group isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/members'>{isLogged ? <GroupMembers isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/explore'>{isLogged ? <Explore isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/settings'>{isLogged ? <Settings isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/settings/account'>{isLogged ? <AccountSettings isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/settings/info'>{isLogged ? <UserInfo isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/404'>{isLogged ? <NotFound/> : <Redirect to='/login'/>}</Route>
            </>
          </Switch>}
      </>
  );
}

export default App;

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

const checkUser = (token, user, uid) => {
  if(!token) return true
  else if(!user) return true
  else if (uid && user.userID !== uid){
    return true
  }
  return false
}