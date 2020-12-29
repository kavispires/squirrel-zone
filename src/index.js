import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './stylesheets/index.css';

import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Creator from './components/Creator';
import Distributor from './components/Distributor';
import Groups from './components/Groups';
import Home from './components/Home';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Route path="/creator">
            <Creator />
          </Route>
          <Route path="/distributor">
            <Distributor />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
