import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// Design Resources
import { Layout } from 'antd';

// Components
import Header from './global/Header';

// Firebase
import { auth } from '../services/firebase';

// Pages
import Admin from './Admin';
import Creator from './Creator';
import Distribute from './Distribute';
import Distributor from './Distributor';
import Groups from './Groups';
import Home from './Home';
import Login from './Login';
// Other Components
import Loading from './global/Loading';
import Notification from './global/Notification';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === false ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(false);
        setIsAuthenticated(true);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    });
  });

  return (
    <Layout className="app">
      <Router>
        <Header isAuthenticated={isAuthenticated} />
        {isLoading ? (
          <Loading />
        ) : (
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute path="/admin" authenticated={isAuthenticated} component={Admin} />
            <PrivateRoute path="/creator" authenticated={isAuthenticated} component={Creator} />
            <PrivateRoute path="/distribute" authenticated={isAuthenticated} component={Distribute} />
            <PrivateRoute path="/distributor" authenticated={isAuthenticated} component={Distributor} />
            <PrivateRoute path="/groups" authenticated={isAuthenticated} component={Groups} />

            <PublicRoute path="/login" authenticated={isAuthenticated} component={Login}></PublicRoute>
          </Switch>
        )}
        <Notification />
      </Router>
    </Layout>
  );
}

export default App;
