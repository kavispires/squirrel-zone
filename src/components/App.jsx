import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// Design Resources
import { Layout } from 'antd';

// Components
import Header from './global/Header';

// Firebase
import { auth } from '../services/firebase';

// Pages
import Admin from './AdminPage';
import Creator from './CreatorPage';
import Distribute from './DistributePage';
import Distribution from './DistributionPage';
import Distributor from './DistributorPage';
import Group from './GroupPage';
import Groups from './GroupsPage';
import Home from './HomePage';
import Login from './LoginPage';

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
  const fromPath = rest?.location?.state?.from?.pathname ?? '/';
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === false ? <Component {...props} /> : <Redirect to={fromPath} />)}
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
            <PrivateRoute path="/distribution" authenticated={isAuthenticated} component={Distribution} />
            <PrivateRoute path="/distributor" authenticated={isAuthenticated} component={Distributor} />
            <PrivateRoute path="/groups" authenticated={isAuthenticated} component={Groups} exact />
            <PrivateRoute path="/groups/:id" authenticated={isAuthenticated} component={Group} />

            <PublicRoute path="/login" authenticated={isAuthenticated} component={Login}></PublicRoute>
          </Switch>
        )}
        <Notification />
      </Router>
    </Layout>
  );
}

export default App;
