import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './components/App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './assets/sass/index.sass';
import './statistics/collectingStatistics.js';
import './statistics/viewingStatistics.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
