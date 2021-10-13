import React, { useEffect, useState } from 'react';
import './App.css';
import './General.css'
import {Route, Switch} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import axios from 'axios';

const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql'
})

const USER_QUERY = gql`
    query user($userID: String!) {
      user(user_id: $userID) {
        first_name
        last_name
    }
}`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path='/'>
          {/* <Query query={USER_QUERY}>
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
          </Query> */}
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
