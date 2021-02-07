import React from 'react';
import { NavLink } from 'react-router-dom';

// Design Resources
import { Layout } from 'antd';

import logo from '../../images/logo.svg';

function Header({ isAuthenticated }) {
  return (
    <Layout.Header className="header">
      <img src={logo} className="header__logo" alt="Squirrel Zone Logo" />
      {isAuthenticated && (
        <nav className="header__nav">
          <ul>
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/history">History</NavLink>
            </li>
            <li>
              <NavLink to="/groups">Groups</NavLink>
            </li>
            <li>
              <NavLink to="/creator">Creator</NavLink>
            </li>
            <li>
              <NavLink to="/distributor">Distributor</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </Layout.Header>
  );
}

export default Header;
