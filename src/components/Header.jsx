import React from 'react';

import logo from '../images/logo.svg';

// Design Resources
import { Layout } from 'antd';

function Header() {
  return (
    <Layout.Header className="header">
      <img src={logo} className="header__logo" alt="Squirrel Zone Logo" />
    </Layout.Header>
  );
}

export default Header;
