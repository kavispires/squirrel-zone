import React from 'react';

// Design Resources
import { Layout } from 'antd';
import EditMember from './admin/EditMember';

// Components

function Admin() {
  return (
    <Layout.Content className="container">
      <main className="main admin">
        <h1>Admin</h1>
        <EditMember />
      </main>
    </Layout.Content>
  );
}

export default Admin;
