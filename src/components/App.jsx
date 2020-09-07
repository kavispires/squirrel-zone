import React from 'react';

// Design Resources
import { Layout } from 'antd';

// Components
import Header from './Header';
import Creator from './Creator';

function App() {
  return (
    <Layout className="app">
      <Header />
      <Creator />
    </Layout>
  );
}

export default App;
