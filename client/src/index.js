import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App';
import Entry from './routes/Entry/Entry.js';
import { WebSocketLink } from 'apollo-link-ws';

import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import {InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import { HttpLink } from 'apollo-link-http';

import {createStore} from 'redux'
import rootReducer from './Redux-reducers/index.js'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import ResetPassword from './routes/Password retrieve/ResetPassword';

const store = createStore(rootReducer, applyMiddleware(thunk))

const httpLink = new HttpLink({
  uri:'https://plamen-main.herokuapp.com/graphql'
  // uri:'http://localhost:8000/graphql'
})

const wsLink = new WebSocketLink({
  uri:`wss://plamen-main.herokuapp.com/graphql`,
  options: {
    reconnect: true,
  }
})

const link = split(
  ({ query }) => {
    const {kind, operation} = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  credentials:"include",
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
      <Router>
        <App />
        <Entry/>
        <ResetPassword/>
      </Router>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
