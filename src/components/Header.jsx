import React from 'react';

// Design Resources
import { Layout } from 'antd';

function Header() {
  return (
    <Layout.Header className="header">
      <img
        src={`${process.env.PUBLIC_URL}/logo.svg`}
        className="header__logo"
        alt="Squirrel Zone Logo"
      />
    </Layout.Header>
  );
}

export default Header;
