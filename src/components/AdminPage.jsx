import React, { useState } from 'react';

// Design Resources
import { Layout, Tabs } from 'antd';

// Components
import EditMember from './admin/EditMember';
import EditGroup from './admin/EditGroup';

// Components
const { TabPane } = Tabs;

function Admin() {
  const [tab, setTab] = useState('1');

  return (
    <Layout.Content className="container">
      <main className="main admin">
        <h1>Admin</h1>
        <Tabs defaultActiveKey="1" onChange={setTab}>
          <TabPane tab="Albums" key="1">
            TBD
          </TabPane>
          <TabPane tab="Groups" key="2">
            <EditGroup />
          </TabPane>
          <TabPane tab="Members" key="3">
            <EditMember />
          </TabPane>
        </Tabs>
      </main>
    </Layout.Content>
  );
}

export default Admin;
