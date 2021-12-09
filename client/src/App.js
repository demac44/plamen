import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import './General.css'

import { authenticate } from './Redux-actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import Feed from './routes/Feed/Feed';
import Profile from './routes/Profile/Profile';
import EditProfile from './routes/Profile/EditProfile';
import Saved from './routes/Profile/Saved';
import Search from './routes/Search/Search';
import SinglePost from './routes/Post/SinglePost';
import Groups from './routes/Groups/Groups';
import Group from './routes/Groups/Group';
import GroupMembers from './routes/Groups/GroupMembers';
import Chats from './routes/Chat/Chats'
import Explore from './routes/Explore/Explore';

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const isLogged = useSelector(state => state?.isAuth.isAuth)
  const uid = useSelector(state => state.isAuth.user?.userID)
  const user = JSON.parse(localStorage.getItem('user'))  
  const token = localStorage.getItem('token')

  useEffect(()=>{
    const checkUser = () => {
      if(!token) return true
      else if(!user) return true
      else if (uid && user.userID !== uid){
        return true
      }
      return false
    }
    dispatch(authenticate())
    if(checkUser()){
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    setIsLoading(false)
  },[isLogged, user, uid, dispatch, token])

  
  return (
      <>
        {isLoading ? 'p' :
          <Switch>
            <>
              <Route exact path='/'></Route>
              <Route exact path='/myprofile'>{isLogged ? <Profile myprofile={true} isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/feed'>{isLogged ? <Feed isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/profile/:id'>{isLogged ? <Profile myprofile={false} isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/settings/editprofile'>{isLogged ? <EditProfile isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/saved'>{isLogged ? <Saved isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/search/:query'>{isLogged ? <Search isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chats'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/chat/:chatid'>{isLogged ? <Chats isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/post/:postid'><SinglePost isLogged={isLogged}/></Route>
              <Route exact path='/communities'>{isLogged ? <Groups isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid'>{isLogged ? <Group isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/community/:groupid/members'>{isLogged ? <GroupMembers isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
              <Route exact path='/explore'>{isLogged ? <Explore isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
            </>
          </Switch>}
      </>
  );
}

export default App;

