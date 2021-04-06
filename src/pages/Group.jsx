import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout, Typography } from 'antd';
// State
import useGlobalState from '../states/useGlobalState';
// Store
import store from '../services/store';
// Utilities
import { serializeKey } from '../utils';
// Components
import LoadingContainer from '../components/global/LoadingContainer';
import GroupCard from '../components/group/GroupCard';

function Group() {
  const history = useHistory();
  const [activeGroup, setActiveGroup] = useGlobalState('activeGroup');

  // Local State
  const [groupId, setGroupId] = useState(null);
  const [tab, setTab] = useState('info');
  const [groupMembers, setGroupMembers] = useState({});

  // Set Group Id or bounce!
  useEffect(() => {
    const [, , currentId, subRoute] = (history?.location?.pathname ?? '').split('/');

    if (!currentId) {
      history.push('/groups');
    }

    if (groupId !== currentId) {
      setGroupId(currentId);
    }

    if (subRoute && subRoute !== tab) {
      setTab(subRoute);
    }
  }, [history, groupId, tab]);

  // Fetch Group Data
  useEffect(() => {
    async function loadContent() {
      const groupData = await store.getRecord('group', groupId);
      setActiveGroup(groupData);

      const members = await store.getCollection('members', true);
      setGroupMembers(
        groupData.membersIds.reduce((acc, memberId) => {
          const key = serializeKey('member', memberId);
          const member = members[key] ?? {};
          acc[key] = member;
          return acc;
        }, {})
      );
    }
    if (groupId) {
      loadContent();
    }
  }, [groupId, setActiveGroup]);

  const goToDistribution = useCallback(
    (id, mode = 'view') => {
      // Modes can be `view`, `edit`, `lyrics`, `new` (in case of new a songId is sent instead of a distributionID)
      history.push(`/distribution/${id}/${mode}`);
    },
    [history]
  );

  const onTabChange = useCallback(
    (key) => {
      const route = key === 'info' ? `/groups/${groupId}` : `/groups/${groupId}/${key}`;
      if (route !== history?.location?.pathname) {
        history.push(route);
        setTab(key);
      }
    },
    [groupId, history]
  );

  return (
    <Layout.Content className="container">
      <main className="main group">
        <Typography.Title>{activeGroup?.id ? activeGroup.name : 'Unknown Group'}</Typography.Title>
        <LoadingContainer waitFor="group" noResults={!Boolean(activeGroup?.id)}>
          <GroupCard
            tab={tab}
            onTabChange={onTabChange}
            activeGroup={activeGroup}
            groupMembers={groupMembers}
            goToDistribution={goToDistribution}
          />
        </LoadingContainer>
      </main>
    </Layout.Content>
  );
}

export default Group;
