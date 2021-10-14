import React, { useEffect } from 'react';
import './App.css';
import './General.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import MyProfile from './routes/Profile/My profile/MyProfile';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from './Redux-actions';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

// import gql from 'graphql-tag';
// import { Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql'
})

// const USER_QUERY = gql`
//     query {
//       users {
//         first_name
//         last_name
//     }
// }`; 

function App() {
  const isLogged = useSelector(state => state.isLogged)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(signin())
  },[isLogged])
    
  return (
    <ApolloProvider client={client}>
      <Switch>
        {isLogged ?
        (
        <>
          <Route exact path='/'></Route>
          <Route exact path='/myprofile'><MyProfile/></Route>
        </>
        ) : <Redirect to='/login'/>}
      </Switch>
    </ApolloProvider>
  );
}

export default App;

          // <Query query={USER_QUERY}>
          //   {
          //     ({ loading, error, data}) => {
          //       if (loading) return <h1>loading</h1>
          //       if (error) console.log(error);
          //       return (
          //         <>
          //           {
          //             data.users.map(user => <h1>{user.first_name+' '+user.last_name}</h1>)
          //           }
          //         </>
          //       )
          //     }
          //   }
          // </Query> 