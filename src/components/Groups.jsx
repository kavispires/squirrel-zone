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
        {isLoading ? (
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
  return (
    <Card title={group.name} size="small" extra={<Button type="primary">Edit</Button>} className="group-card">
      <Descriptions size="small">
        <Descriptions.Item label="Years Active">
          {group.disbandmentYear - group.debutYear + 1}
        </Descriptions.Item>
        <Descriptions.Item label="Debut Year">{group.debutYear}</Descriptions.Item>
        <Descriptions.Item label="Disbandment Year">{group.disbandmentYear}</Descriptions.Item>
      </Descriptions>
      <Tabs defaultActiveKey="1" size="small" className="group-card__tabs">
        <TabPane tab="Members" key="1">
          <ul className="group-card__members">
            {group.membersIds &&
              group.membersIds.map((memberId) => {
                const member = members[serializeKey('member', memberId)] ?? {};
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
          TBD
        </TabPane>
        <TabPane tab="Distributions" key="3">
          <Button type="primary" onClick={() => activateGroup(group)}>
            Create a Distribution for this group
          </Button>
        </TabPane>
      </Tabs>
    </Card>
  );
}

export default Groups;
