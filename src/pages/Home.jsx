import React from 'react';

// Design Resources
import { Image, Layout } from 'antd';
// Utilities
import { IMAGE_URL } from '../utils/constants';
// Images
import logo from '../images/logo-circle.svg';

function Home() {
  return (
    <Layout.Content className="container">
      <main className="main home">
        <div className="home__logo-container">
          <Image
            alt="Squirrel Zone"
            src={logo}
            fallback={`${IMAGE_URL.GROUP}no-group-photo.jpg`}
            className="home__logo"
          />
          <h1 className="home__name">Squirrel Zone</h1>
          <h3 className="home__tagline">On the Microphone</h3>
        </div>
      </main>
    </Layout.Content>
  );
}

export default Home;
