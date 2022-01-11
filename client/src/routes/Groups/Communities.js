import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useMutation } from 'react-apollo'
import { useDispatch, useSelector } from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import { authenticate } from '../../Redux-actions/auth';
import axios from 'axios';
import {gql} from 'graphql-tag'


import Groups from './Groups'
import MainLoader from '../../components/General components/Loaders/MainLoader';

const Group = lazy(()=>import('./Group'))
const CommunityChat = lazy(()=>import('./CommunityChat'))
// const Groups = lazy(()=>import('./Groups'))
const GroupMembers = lazy(()=>import('./GroupMembers'))
const GroupSettings = lazy(()=>import('./Settings/GroupSettings'))
const GroupEditInfo = lazy(()=>import('./Settings/GroupEditInfo'))
const ManagePosts = lazy(()=>import('./Settings/ManagePosts'))
const JoinRequests = lazy(()=>import('./Settings/JoinRequests'))
const ManageUsers = lazy(()=>import('./Settings/ManageUsers'))
const SavedCommunityPosts = lazy(()=>import('./SavedCommunityPosts'))
const CommunityInfo = lazy(()=>import('./CommunityInfo'))

const Communities = () => {
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
            setInterval(()=>{
              set_last_seen({variables:{userID: uid}})
            }, 120000)
            setLoading(false)
        }
      },[isLogged, user, uid, token, dispatch])

    return (
      <>
      {loading ? <MainLoader/> :
      (isLogged ?
        <Switch>
          <Route exact path='/communities'>{isLogged ? <Groups isLogged={isLogged}/> : <Redirect to='/login'/>}</Route>
          <Suspense fallback={<MainLoader/>}>
              <Route exact path='/community/:groupid'>{<Group isLogged={isLogged}/>}</Route>
              <Route exact path='/community/:groupid/chat'>{<CommunityChat isLogged={isLogged}/>}</Route>
              <Route exact path='/community/:groupid/members'>{<GroupMembers isLogged={isLogged}/>}</Route>
              <Route exact path='/community/:groupid/settings'>{<GroupSettings isLogged={isLogged}/>}</Route>
              <Route exact path='/community/:groupid/settings/edit_info'>{<GroupEditInfo isLogged={isLogged}/>}</Route>
              <Route exact path='/community/:groupid/settings/manage_posts'>{<ManagePosts isLogged={isLogged}/>}</Route>
              <Route exact path='/community/:groupid/settings/join_requests'>{<JoinRequests isLogged={isLogged}/>}</Route>
              <Route exact path='/community/:groupid/settings/manage_users'>{<ManageUsers isLogged={isLogged}/>}</Route>            
              <Route exact path='/community/:groupid/saved'>{<SavedCommunityPosts isLogged={isLogged}/>}</Route>            
              <Route exact path='/community/:groupid/info'>{<CommunityInfo isLogged={isLogged}/>}</Route>     
          </Suspense>
        </Switch> : <Redirect to='/login'/>)}
      </>
    )
}

export default Communities

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
  mutation ($userID: Int!){
    set_last_seen (userID: $userID){
      userID
    }
  }

`