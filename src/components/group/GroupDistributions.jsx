import React, { useState, useEffect } from 'react';

// Design Resources
import { Button, Table } from 'antd';
import { EditOutlined, FileAddOutlined, FileTextOutlined, YoutubeOutlined } from '@ant-design/icons';
// Store
import store from '../../services/store';
// Utilities
import { DISTRIBUTION_NAME } from '../../utils/constants';
// Components
import ButtonContainer from '../ButtonContainer';

function GroupDistributions({ group, members, activateDistribution, activateLyrics }) {
  const [groupDistributions, setGroupDistributions] = useState(null);
  const [groupedDistributions, setGroupedDistributions] = useState([]);

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

  useEffect(() => {
    if (groupDistributions) {
      const grouped = groupDistributions.reduce((acc, dist) => {
        const groupKey = dist.name in DISTRIBUTION_NAME ? dist.name : 'UNCATEGORIZED';

        if (acc[groupKey] === undefined) acc[groupKey] = [];

        acc[groupKey].push(dist);
        return acc;
      }, {});

      const groupedSections = Object.values(DISTRIBUTION_NAME).reduce((acc, name) => {
        if (grouped[name]) {
          acc.push({
            sectionTitle: name,
            distributions: grouped[name],
          });
        }

        return acc;
      }, []);

      if (grouped.UNCATEGORIZED) {
        groupedSections.push({
          sectionTitle: 'UNCATEGORIZED',
          distributions: grouped.UNCATEGORIZED,
        });
      }

      setGroupedDistributions(groupedSections);
    }
  }, [groupDistributions, setGroupedDistributions]);

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
    },
    {
      title: 'Snippet',
      dataIndex: 'id',
      className: 'group-distribution-table__snippet',
      render: (_, data) => <GroupDistributionSnippet distribution={data} members={members} />,
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
      title: 'Lyrics',
      dataIndex: 'id',
      className: 'group-distribution-table__button',
      render: (_, data) => (
        <Button
          type="primary"
          size="small"
          icon={<FileTextOutlined />}
          onClick={() => activateLyrics(data)}
          disabled
        >
          Lyrics
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
    <div className="group-distributions">
      <ButtonContainer center fullWidth>
        <Button type="default" icon={<FileAddOutlined />} onClick={() => activateDistribution()}>
          Create a Distribution for this group
        </Button>
      </ButtonContainer>
      {groupedDistributions &&
        groupedDistributions?.map((gDist) => (
          <div key={`${group.id}-${gDist.sectionTitle}`}>
            <h3>
              {gDist.sectionTitle} ({gDist.distributions.length} songs)
            </h3>
            <OverallDistribution distributions={gDist.distributions} members={members} />
            <Table
              dataSource={gDist.distributions}
              columns={columns}
              showHeader={false}
              size="small"
              tableLayout="auto"
            />
          </div>
        ))}
    </div>
  );
}

function OverallDistribution({ distributions, members }) {
  const overallTotal = distributions.length * 100;

  const overallDistribution = distributions.reduce(
    (acc, dist) => {
      Object.keys(members).forEach((memberKey) => {
        if (acc.stats[memberKey] === undefined) {
          acc.stats[memberKey] = {
            absoluteProgress: 0,
            overallTotal: 0,
          };
        }
        acc.stats[memberKey].overallTotal += dist?.stats[memberKey]?.absoluteProgress ?? 0;

        acc.stats[memberKey].absoluteProgress = Math.round(
          (acc.stats[memberKey].overallTotal * 100) / overallTotal
        );
      });
      return acc;
    },
    {
      id: 'overall',
      stats: {},
    }
  );

  return (
    <div className="group-distribution-overall">
      <span className="group-distribution-overall__title">Overall</span>
      <GroupDistributionSnippet
        distribution={overallDistribution}
        members={members}
        className="group-distribution-overall__snippet"
      />
    </div>
  );
}

function GroupDistributionSnippet({ distribution, members, className = '' }) {
  return (
    <ul className={`group-distribution-snippet ${className}`}>
      {Object.entries(members).map(([memberKey, memberData]) => {
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

export default GroupDistributions;
