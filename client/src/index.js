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

const store = createStore(rootReducer, applyMiddleware(thunk))

const httpLink = new HttpLink({
  uri:'http://localhost:5000/graphql'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials:"include",
  link
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
      <Router>
        <App />
        <Entry/>
      </Router>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
