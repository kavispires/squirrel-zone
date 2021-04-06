import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout, Typography } from 'antd';
// Store
import store from '../services/store';
// Components
import LoadingContainer from '../components/global/LoadingContainer';
import GroupsCards from '../components/GroupsCards';

function Groups() {
  const history = useHistory();
  const [groups, setGroups] = useState([]);

  // Fetch Groups
  useEffect(() => {
    async function loadContent() {
      setGroups(await store.getCollection('groups'));
    }
    loadContent();
  }, []);

  const goToGroupPage = useCallback(
    (e, group, subRoute) => {
      e.stopPropagation();
      history.push(subRoute ? `/groups/${group.id}/${subRoute}` : `/groups/${group.id}`);
    },
    [history]
  );

  return (
    <Layout.Content className="container">
      <main className="main groups">
        <Typography.Title>Groups</Typography.Title>
        <LoadingContainer waitFor="group" noResults={!groups.length}>
          <GroupsCards groups={groups} goToGroupPage={goToGroupPage} />
        </LoadingContainer>
      </main>
    </Layout.Content>
  );
}

export default Groups;
