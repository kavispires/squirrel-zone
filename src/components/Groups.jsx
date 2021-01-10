import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Button, Layout, Card, Spin, Descriptions, Tabs } from 'antd';
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
  const history = useHistory();
  const [isLoading] = useGlobalState('isLoading');
  const [, setActiveGroup] = useGlobalState('activeGroup');
  const [, setActiveMembers] = useGlobalState('activeMembers');
  const [, setLineDistribution] = useGlobalState('lineDistribution');
  const [, setIsFullyLoaded] = useDistributorState('isFullyLoaded');

  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState({});

  useEffect(() => {
    async function loadContent() {
      setMembers(await store.getCollection('members', true));
      setGroups(await store.getCollection('groups'));
    }
    loadContent();
  }, []);

  const activateGroup = useCallback(
    (group) => {
      setActiveMembers(null);
      setLineDistribution({});
      setIsFullyLoaded(false);
      setActiveGroup(group);

      history.push('/distribute');
    },
    [history, setActiveGroup, setActiveMembers, setLineDistribution, setIsFullyLoaded]
  );

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
              <Group key={group.id} group={group} members={members} activateGroup={activateGroup} />
            ))}
          </ul>
        )}
      </main>
    </Layout.Content>
  );
}

function Group({ group, members, activateGroup }) {
  const [tab, setTab] = useState('1');
  const [groupMembers, setGroupMembers] = useState({});

  useEffect(() => {
    setGroupMembers(
      group.membersIds.reduce((acc, memberId) => {
        const key = serializeKey('member', memberId);
        const member = members[key] ?? {};
        acc[key] = member;
        console.log(acc);
        return acc;
      }, {})
    );
  }, [members, group.membersIds]);

  const onChangeTab = (tab1) => {
    setTab(tab1);
  };

  return (
    <Card title={group.name} size="small" extra={<Button type="primary">Edit</Button>} className="group-card">
      <Descriptions size="small">
        <Descriptions.Item label="Years Active">
          {group.disbandmentYear - group.debutYear + 1}
        </Descriptions.Item>
        <Descriptions.Item label="Debut Year">{group.debutYear}</Descriptions.Item>
        <Descriptions.Item label="Disbandment Year">{group.disbandmentYear}</Descriptions.Item>
      </Descriptions>
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
          {tab === '3' && <GroupDistributions group={group} groupMembers={groupMembers} />}
          <Button type="primary" onClick={() => activateGroup(group)}>
            Create a Distribution for this group
          </Button>
        </TabPane>
      </Tabs>
    </Card>
  );
}

function GroupDistributions({ group, groupMembers }) {
  const [groupDistributions, setGroupDistributions] = useState(null);

  useEffect(() => {
    async function loadContent() {
      console.log('GETTING COLLECTION FOR', group.id);
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
            <GroupDistribution distribution={groupDistribution} groupMembers={groupMembers} />
          ))}
        </ul>
      ) : (
        <p>This group has no distributions yet.</p>
      )}
    </div>
  );
}

function GroupDistribution({ distribution, groupMembers }) {
  return (
    <li className="group-distribution">
      <span className="group-distribution__title">{distribution.songTitle}</span>
      <span className="group-distribution__version">{distribution.name}</span>
      <GroupDistributionSnippet distribution={distribution} groupMembers={groupMembers} />
      <Button type="default" className="group-distribution__edit-button">
        Edit
      </Button>
      <Button type="primary" className="group-distribution__view-button">
        View
      </Button>
    </li>
  );
}

function GroupDistributionSnippet({ distribution, groupMembers }) {
  return (
    <ul className="group-distribution-snippet">
      {Object.entries(groupMembers).map(([memberKey, memberData]) => {
        console.log({ distribution });
        console.log({ memberData });
        const progress = distribution?.stats[memberKey]?.absoluteProgress ?? 0;
        return (
          <span style={{ width: `${progress}%`, backgroundColor: memberData.color }}>
            {progress > 10 ? progress : ''}
          </span>
        );
      })}
    </ul>
  );
}

export default Groups;
