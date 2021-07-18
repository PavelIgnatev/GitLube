import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './assets/sass/index.sass';
import './statistics/collectingStatistics';
import './statistics/viewingStatistics';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
