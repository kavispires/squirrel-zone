import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/index.css';

import * as serviceWorker from './serviceWorker';

import App from './pages/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
