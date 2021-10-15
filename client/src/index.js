import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App';
import Entry from './routes/Entry/Entry.js';

import {createStore} from 'redux'
import rootReducer from './Redux-reducers/index.js'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Entry/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
