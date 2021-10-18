import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import './General.css'

import ApolloClient, {InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './Redux-actions';

import MyProfile from './routes/Profile/My profile/MyProfile';
import Feed from './routes/Feed/Feed';
import Profile from './routes/Profile/Visited profile/Profile';

const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql',
  cache: new InMemoryCache()
})


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const isLogged = useSelector(state => state?.isAuth.isAuth)
  let user = localStorage.getItem('user')
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(!user) localStorage.removeItem('token')
    dispatch(authenticate());
    setIsLoading(false)
  },[dispatch, isLogged])
  
  
  return (
    <>
      {isLoading ? <h1>loading</h1> :
        <ApolloProvider client={client}>
          <Switch>
              {isLogged ?
              (
                <>
                <Route exact path='/'></Route>
                <Route exact path='/myprofile'><MyProfile/></Route>
                <Route exact path='/feed'><Feed/></Route>
                <Route exact path='/profile/:id'><Profile/></Route>
              </>
              ) : <Redirect to='/login'/>}
          </Switch>
        </ApolloProvider>}
    </>
  );
}

export default App;