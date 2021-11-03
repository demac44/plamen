import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import './General.css'

import ApolloClient, {InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
// import {WebSocketLink} from 'subscriptions-transport-ws'

import { authenticate } from './Redux-actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import Feed from './routes/Feed/Feed';
import Profile from './routes/Profile/Profile';
import EditProfile from './routes/Profile/EditProfile';
import Saved from './routes/Profile/Saved';
import Search from './routes/Search/Search';


const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql', 
  cache: new InMemoryCache(),
  credentials:"include"
})


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
    {isLoading ? <h1>loading</h1> :
        <ApolloProvider client={client}>
          <Switch>
              {isLogged ?
              (
                <>
                  <Route exact path='/'></Route>
                  <Route exact path='/myprofile'><Profile myprofile={true}/></Route>
                  <Route exact path='/feed'><Feed/></Route>
                  <Route exact path='/profile/:id'><Profile myprofile={false}/></Route>
                  <Route exact path='/editprofile'><EditProfile/></Route>
                  <Route exact path='/saved'><Saved/></Route>
                  <Route exact path='/search/:query'><Search/></Route>
                </>
              ) : <Redirect to='/login'/>}
          </Switch>
        </ApolloProvider>}
    </>
  );
}

export default App;

