import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import './General.css'

import ApolloClient, {InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './Redux-actions';

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
  const [isLoading, setIsLoading] = useState(true)
  const isLogged = useSelector(state => state?.isAuth.isAuth)
  let user = localStorage.getItem('user')
  let token = localStorage.getItem('token')
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(!user) localStorage.removeItem('token')
    if(!token) localStorage.removeItem('user')
    dispatch(authenticate());
    setIsLoading(false)
  },[dispatch, isLogged, user])
  
  
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