import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'

import './index.css'

import Home from './Home';
import SupportAdmin from './SupportAdmin';

const path = window.location.pathname

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    { path.indexOf('/support') === -1 ? <Home /> : <App /> }
  </React.StrictMode>
);
