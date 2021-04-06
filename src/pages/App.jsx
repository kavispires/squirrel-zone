import React, { Fragment, useState, useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// Design Resources
import { Layout } from 'antd';

// Components
import Header from '../components/global/Header';

// Firebase
import { auth } from '../services/firebase';

// Pages
import Admin from '../components/AdminPage';
import Creator from '../components/CreatorPage';
import Distribute from '../components/DistributePage';
import Distribution from '../components/DistributionPage';
import Distributor from '../components/DistributorPage';
import Group from './Group';
import Groups from './Groups';
import Home from '../pages/Home';
import Login from '../components/LoginPage';

// Other Components
import Loading from '../components/global/Loading';
import Notification from '../components/global/Notification';

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
    <Layout className="app app--animated">
      <Router>
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <Header isAuthenticated={isAuthenticated} />
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
          </Fragment>
        )}
        <Notification />
      </Router>
    </Layout>
  );
}

export default App;
