import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Button, Table, Typography } from 'antd';
import { EditOutlined, FileTextOutlined, YoutubeOutlined } from '@ant-design/icons';
// Utilities
import { humanize } from '../../utils';
// Components
import GroupOverallDistributionSnippet from './GroupOverallDistributionSnippet';
import GroupDistributionSnippet from './GroupDistributionSnippet';

function GroupDistributionTables({ group, members, goToDistribution, groupedDistributions }) {
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
          onClick={() => goToDistribution(data.id, 'edit')}
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
          onClick={() => goToDistribution(data.id, 'lyrics')}
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
          onClick={() => goToDistribution(data.id, 'view')}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      {groupedDistributions &&
        groupedDistributions?.map((gDist) => (
          <div key={`${group.id}-${gDist.sectionTitle}`}>
            <Typography.Title level={3}>
              <span className="">{humanize(gDist.sectionTitle)}</span> ({gDist.distributions.length} songs)
            </Typography.Title>
            <GroupOverallDistributionSnippet distributions={gDist.distributions} members={members} />
            <Table
              dataSource={gDist.distributions}
              columns={columns}
              showHeader={false}
              size="small"
              tableLayout="auto"
            />
          </div>
        ))}
    </Fragment>
  );
}

GroupDistributionTables.propTypes = {
  group: PropTypes.object,
  members: PropTypes.object,
  activateDistribution: PropTypes.func,
  activateLyrics: PropTypes.func,
  groupedDistributions: PropTypes.array,
};

export default GroupDistributionTables;
