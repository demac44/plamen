import React, { useEffect, useState } from 'react';
import './App.css';
import './General.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import MyProfile from './routes/Profile/My profile/MyProfile';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './Redux-actions';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'


const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql'
})


function App() {
  const [loading, setLoading] = useState(true)
  const isLogged = useSelector(state => state.isAuth.isAuth)
  const user = useSelector(state => state.isAuth.user)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(authenticate());
    setLoading(false)
  },[dispatch, isLogged])

  
  return (
    <ApolloProvider client={client}>
      {loading ? <h1>loading</h1> :
        <Switch>
          {isLogged ?
          (
          <>
            <Route exact path='/'></Route>
            <Route exact path='/myprofile'><MyProfile/></Route>
          </>
          ) : <Redirect to='/login'/>}
        </Switch>}
    </ApolloProvider>
  );
}

export default App;