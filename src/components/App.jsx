import React from 'react';

// Design Resources
import { Layout } from 'antd';

// Components
import Header from './Header';

function App({ children }) {
  return (
    <Layout className="app">
      <Header />
      {children}
    </Layout>
  );
}

export default App;
