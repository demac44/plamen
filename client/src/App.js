import React, { useEffect, useState } from 'react';
import './App.css';
import './General.css'
import {Route, Switch, useHistory, Redirect} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import axios from 'axios';
import jwt from 'jsonwebtoken'


const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql'
})

const USER_QUERY = gql`
    query {
      users {
        first_name
        last_name
    }
}`; 

function App() {
  const history = useHistory()
  const [isLogged, setIsLogged] = useState(true)


  useEffect(()=>{
    setIsLogged(false)
    const token = localStorage.getItem('token')

    // localStorage.removeItem('token')

    if (token){
      const user = jwt.decode(token)
      if (!user){
        localStorage.removeItem('token')
        history.push('/login')
      } else {
        setIsLogged(true)
      }
    } 

  }, [isLogged])
  
  return (
    <ApolloProvider client={client}>
      <Switch>
        {isLogged ?
        <Route exact path='/'>
          <Query query={USER_QUERY}>
            {
              ({ loading, error, data}) => {
                if (loading) return <h1>loading</h1>
                if (error) console.log(error);
                return (
                  <>
                    {
                      data.users.map(user => <h1>{user.first_name+' '+user.last_name}</h1>)
                    }
                  </>
                )
              }
            }
          </Query> 
        </Route> : <Redirect from='/' to='/login'/>}
      </Switch>
    </ApolloProvider>
  );
}

export default App;
