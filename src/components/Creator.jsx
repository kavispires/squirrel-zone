import React from 'react';

// Design Resources
import { Layout } from 'antd';

// Components
import Character from './Character';

function Creator() {
  return (
    <Layout.Content className="container">
      <main className="main creator">
        <h1>Creator</h1>
        <section className="creator-container">
          <Character />
        </section>
      </main>
    </Layout.Content>
  );
}

export default Creator;
