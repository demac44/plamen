import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import Entry from './routes/Entry/Entry';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <Entry/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
