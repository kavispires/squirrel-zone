import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Button, Layout, Card, Tabs, Affix, Table } from 'antd';
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
import LoadingContainer from './global/LoadingContainer';
const { TabPane } = Tabs;

function Groups() {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState({});
  const groupsRefs = useRef([]);

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
        <LoadingContainer waitFor="group" noResults={!groups.length}>
          <div className="groups-page">
            <ul className="group-card-containers">
              {groups.map((group, i) => (
                <li key={group.id} ref={(el) => (groupsRefs.current[i] = el)}>
                  <Group group={group} members={members} />
                </li>
              ))}
            </ul>
            <aside>
              <Affix offsetTop={120}>
                <ul className="group-quick-links">
                  {groups.map((group, i) => (
                    <li key={`quick-link-${group.id}`} className="group-quick-links__link">
                      <Button
                        type="link"
                        size="small"
                        onClick={() => groupsRefs.current[i].scrollIntoView({ behavior: 'smooth' })}
                      >
                        {group.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </Affix>
            </aside>
          </div>
        </LoadingContainer>
      </main>
    </Layout.Content>
  );
}

function Group({ group, members }) {
  const history = useHistory();
  const [, setActiveGroup] = useGlobalState('activeGroup');
  const [, setActiveGroupSongs] = useGlobalState('activeGroupSongs');
  const [, setActiveMembers] = useGlobalState('activeMembers');
  const [, setLineDistribution] = useGlobalState('lineDistribution');
  const [, setLoadedLineDistribution] = useGlobalState('loadedLineDistribution');
  const [, setIsFullyLoaded] = useDistributorState('isFullyLoaded');

  const [tab, setTab] = useState('1');
  const [groupMembers, setGroupMembers] = useState({});

  const activateDistribution = useCallback(
    async (distribution, isEdit = false) => {
      setIsFullyLoaded(false);
      setActiveMembers(null);
      setActiveGroup(group);

      const groupDistributionsResponse = await store.getCollection('distributions', null, {
        groupId: group.id,
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
      setActiveGroup,
      setActiveMembers,
      setLineDistribution,
      setIsFullyLoaded,
      setLoadedLineDistribution,
      group,
      setActiveGroupSongs,
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
                  key={member.key}
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
      setGroupDistributions(
        await store.getCollection('distributions', null, {
          groupId: group.id,
        })
      );
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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'songTitle',
      className: 'group-distribution-table__title',
      render: (title, data) => (data.name !== 'original' ? `${title} (${data.name})` : title),
    },
    {
      title: 'Snippet',
      dataIndex: 'id',
      className: 'group-distribution-table__snippet',
      render: (_, data) => <GroupDistributionSnippet distribution={data} groupMembers={groupMembers} />,
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      className: 'group-distribution-table__button',
      render: (_, data) => (
        <Button
          type="default"
          size="small"
          icon={<EditOutlined />}
          onClick={() => activateDistribution(data, true)}
        >
          Edit
        </Button>
      ),
    },
    {
      title: 'View',
      dataIndex: 'id',
      className: 'group-distribution-table__button',
      render: (_, data) => (
        <Button
          type="primary"
          size="small"
          icon={<YoutubeOutlined />}
          onClick={() => activateDistribution(data)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={groupDistributions}
      columns={columns}
      showHeader={false}
      size="small"
      tableLayout="auto"
    />
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
            {progress > 5 ? `${progress}%` : ''}
          </span>
        );
      })}
    </ul>
  );
}

export default Groups;
