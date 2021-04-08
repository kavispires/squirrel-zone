import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Design Resources
import { Button, Layout, Typography } from 'antd';
// Images
import Footer from '../components/chrome/Footer';

function NotFound() {
  const location = useLocation();

  return (
    <Layout.Content className="container">
      <main className="main not-found">
        <div className="not-found__container">
          <Typography.Title>404</Typography.Title>
          <Typography.Text level={3}>
            The page <code>{location.pathname}</code> does not exist.
          </Typography.Text>
          <Link to="/" component={Button} className="not-found__button">
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </Layout.Content>
  );
}

export default NotFound;
