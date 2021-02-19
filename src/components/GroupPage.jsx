import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout, Card } from 'antd';
// State
import useGlobalState from '../states/useGlobalState';
import useDistributorState from '../states/useDistributorState';
// Store
import store from '../services/store';
// Utilities
import { serializeKey } from '../utils/distributor';
// Components
import GroupDistributions from './group/GroupDistributions';
import GroupInfo from './group/GroupInfo';
import GroupMembers from './group/GroupMembers';
import LoadingContainer from './global/LoadingContainer';

function Group() {
  const history = useHistory();
  const [activeGroup, setActiveGroup] = useGlobalState('activeGroup');
  const [, setActiveGroupSongs] = useGlobalState('activeGroupSongs');
  const [, setActiveMembers] = useGlobalState('activeMembers');
  const [, setLineDistribution] = useGlobalState('lineDistribution');
  const [, setLoadedLineDistribution] = useGlobalState('loadedLineDistribution');
  const [, setIsFullyLoaded] = useDistributorState('isFullyLoaded');

  // Local State
  const [groupId, setGroupId] = useState(null);
  const [tab, setTab] = useState('info');
  const [groupMembers, setGroupMembers] = useState({});

  // Set Group Id or bounce!
  useEffect(() => {
    const path = history?.location?.pathname?.split('/');
    const currentId = path?.[2];
    const subRoute = path?.[3];

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

  const activateDistribution = useCallback(
    async (distribution, isEdit = false) => {
      setIsFullyLoaded(false);
      setActiveMembers(null);

      const groupDistributionsResponse = await store.getCollection('distributions', null, {
        groupId: groupId,
      });
      const activeGroupSongs = groupDistributionsResponse.reduce((acc, dist) => {
        acc[dist.songId] = true;
        return acc;
      }, {});
      setActiveGroupSongs(activeGroupSongs);

      if (distribution) {
        const distributionData = await store.getRecord('distribution-data', distribution.id);
        setLoadedLineDistribution(distribution);
        setLineDistribution(distributionData.assignedParts);

        const route = isEdit ? 'distribute' : 'distribution';
        history.push(`/${route}/${distribution.id}`);
        return;
      }

      setLoadedLineDistribution({});
      setLineDistribution({});
      history.push(`/distribute/new`);
    },
    [
      history,
      setActiveMembers,
      setLineDistribution,
      setIsFullyLoaded,
      setLoadedLineDistribution,
      groupId,
      setActiveGroupSongs,
    ]
  );

  const activateLyrics = useCallback(() => {}, []);

  const tabList = [
    {
      key: 'info',
      tab: 'Info',
    },
    {
      key: 'members',
      tab: 'Members',
    },
    {
      key: 'distributions',
      tab: 'Distributions',
    },
  ];

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
        <h1>{activeGroup?.id ? activeGroup.name : 'Group'}</h1>
        <LoadingContainer waitFor="group" noResults={!Boolean(activeGroup?.id)}>
          <Card
            style={{ width: '100%' }}
            title={activeGroup?.name ?? 'Group'}
            tabList={tabList}
            activeTabKey={tab}
            onTabChange={onTabChange}
          >
            {tab === 'info' && <GroupInfo group={activeGroup} />}
            {tab === 'members' && <GroupMembers members={groupMembers} />}
            {tab === 'distributions' && (
              <GroupDistributions
                group={activeGroup}
                members={groupMembers}
                activateDistribution={activateDistribution}
                activateLyrics={activateLyrics}
              />
            )}
          </Card>
        </LoadingContainer>
      </main>
    </Layout.Content>
  );
}

export default Group;
