import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Button, Layout, Card, Spin, Tabs } from 'antd';
import { EditOutlined, FileAddOutlined, YoutubeOutlined } from '@ant-design/icons';
// State
import useGlobalState from '../states/useGlobalState';
import useDistributorState from '../states/useDistributorState';
// Store
import store from '../services/store';
// Utilities
import { serializeKey } from '../utils/distributor';
// Components
import Member from './Member';
const { TabPane } = Tabs;

function Groups() {
  const [isLoading] = useGlobalState('isLoading');

  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState({});

  useEffect(() => {
    async function loadContent() {
      setMembers(await store.getCollection('members', true));
      setGroups(await store.getCollection('groups'));
    }
    loadContent();
  }, []);

  return (
    <Layout.Content className="container">
      <main className="main groups">
        <h1>Groups</h1>
        {isLoading && !groups.length ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <ul className="group-card-containers">
            {groups.map((group) => (
              <Group key={group.id} group={group} members={members} />
            ))}
          </ul>
        )}
      </main>
    </Layout.Content>
  );
}

function Group({ group, members }) {
  const history = useHistory();
  const [, setActiveGroup] = useGlobalState('activeGroup');
  const [, setActiveMembers] = useGlobalState('activeMembers');
  const [, setLineDistribution] = useGlobalState('lineDistribution');
  const [, setLoadedLineDistribution] = useGlobalState('loadedLineDistribution');
  const [, setIsFullyLoaded] = useDistributorState('isFullyLoaded');

  const [tab, setTab] = useState('1');
  const [groupMembers, setGroupMembers] = useState({});

  const activateDistribution = useCallback(
    async (distribution) => {
      console.log({ distribution });
      setIsFullyLoaded(false);
      setActiveMembers(null);
      setActiveGroup(group);

      if (distribution) {
        const distributionData = await store.getRecord('distribution-data', distribution.id);
        console.log({ distributionData });
        setLoadedLineDistribution(distribution);
        setLineDistribution(distributionData.assignedParts);
        history.push(`/distribute/${distribution.id}`);
        return;
      }

      setLoadedLineDistribution({});
      setLineDistribution({});
      history.push(`/distribute/new`);
    },
    [
      history,
      setActiveGroup,
      setActiveMembers,
      setLineDistribution,
      setIsFullyLoaded,
      setLoadedLineDistribution,
      group,
    ]
  );

  useEffect(() => {
    setGroupMembers(
      group.membersIds.reduce((acc, memberId) => {
        const key = serializeKey('member', memberId);
        const member = members[key] ?? {};
        acc[key] = member;
        return acc;
      }, {})
    );
  }, [members, group.membersIds]);

  const onChangeTab = (tab1) => {
    setTab(tab1);
  };

  return (
    <Card
      title={`${group.name} • ${group.debutYear} — ${group.disbandmentYear}`}
      size="small"
      extra={
        <Button type="default" size="small" icon={<EditOutlined />}>
          Edit
        </Button>
      }
      className="group-card"
    >
      <Tabs defaultActiveKey="1" size="small" className="group-card__tabs" onChange={onChangeTab}>
        <TabPane tab="Members" key="1">
          <ul className="group-card__members">
            {Object.values(groupMembers).map((member) => {
              return (
                <Member
                  key={member.id}
                  member={member}
                  showName
                  showPosition
                  className="group-card__member"
                />
              );
            })}
          </ul>
        </TabPane>
        <TabPane tab="Albums" key="2">
          Albums will come here.
        </TabPane>
        <TabPane tab="Distributions" key="3">
          {tab === '3' && (
            <GroupDistributions
              group={group}
              groupMembers={groupMembers}
              activateDistribution={activateDistribution}
            />
          )}
          <Button type="default" icon={<FileAddOutlined />} onClick={() => activateDistribution()}>
            Create a Distribution for this group
          </Button>
        </TabPane>
      </Tabs>
    </Card>
  );
}

function GroupDistributions({ group, groupMembers, activateDistribution }) {
  const [groupDistributions, setGroupDistributions] = useState(null);

  useEffect(() => {
    async function loadContent() {
      setGroupDistributions(await store.getCollection('distributions', null, { groupId: group.id }));
    }

    if (!groupDistributions) {
      loadContent();
    }
  }, [group.id, groupDistributions]);

  if (!groupDistributions) {
    return (
      <div>
        <p>Distributions not loaded yet.</p>
      </div>
    );
  }

  return (
    <div>
      {groupDistributions?.length ? (
        <ul className="group-distributions">
          {groupDistributions.map((groupDistribution) => (
            <GroupDistribution
              key={groupDistribution.id}
              distribution={groupDistribution}
              groupMembers={groupMembers}
              activateDistribution={activateDistribution}
            />
          ))}
        </ul>
      ) : (
        <p>This group has no distributions yet.</p>
      )}
    </div>
  );
}

function GroupDistribution({ distribution, groupMembers, activateDistribution }) {
  return (
    <li className="group-distribution">
      <span className="group-distribution__title">{distribution.songTitle}</span>
      <span className="group-distribution__version">{distribution.name}</span>
      <GroupDistributionSnippet distribution={distribution} groupMembers={groupMembers} />
      <Button
        type="default"
        size="small"
        icon={<EditOutlined />}
        className="group-distribution__edit-button"
        onClick={() => activateDistribution(distribution)}
      >
        Edit
      </Button>
      <Button
        type="primary"
        size="small"
        icon={<YoutubeOutlined />}
        className="group-distribution__view-button"
      >
        View
      </Button>
    </li>
  );
}

function GroupDistributionSnippet({ distribution, groupMembers }) {
  return (
    <ul className="group-distribution-snippet">
      {Object.entries(groupMembers).map(([memberKey, memberData]) => {
        const progress = distribution?.stats[memberKey]?.absoluteProgress ?? 0;
        return (
          <span
            key={`${distribution.id}${memberKey}`}
            style={{ width: `${progress}%`, backgroundColor: memberData.color }}
          >
            {progress > 10 ? progress : ''}
          </span>
        );
      })}
    </ul>
  );
}

export default Groups;
