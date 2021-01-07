import React from 'react';

// Design Resources
import { Layout } from 'antd';

// Components
import EditMember from './admin/EditMember';
import EditGroup from './admin/EditGroup';

// Components

function Admin() {
  return (
    <Layout.Content className="container">
      <main className="main admin">
        <h1>Admin</h1>
        <EditMember />
        <EditGroup />
      </main>
    </Layout.Content>
  );
}

export default Admin;
