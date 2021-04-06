import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Button } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
// Store
import store from '../../services/store';
// Utilities
import { DISTRIBUTION_NAME } from '../../utils/constants';
// Components
import ButtonContainer from '../ButtonContainer';
import GroupDistributionTables from './GroupDistributionTables';

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
      <div className="group-distributions">
        <p>Distributions not loaded yet.</p>
      </div>
    );
  }

  return (
    <div className="group-distributions">
      <ButtonContainer center fullWidth>
        <Button type="default" icon={<FileAddOutlined />} onClick={() => activateDistribution()}>
          Create a Distribution for this group
        </Button>
      </ButtonContainer>
      <GroupDistributionTables
        group={group}
        members={members}
        activateDistribution={activateDistribution}
        activateLyrics={activateLyrics}
        groupedDistributions={groupedDistributions}
      />
    </div>
  );
}

GroupDistributions.propTypes = {
  group: PropTypes.object,
  members: PropTypes.object,
  activateDistribution: PropTypes.func,
  activateLyrics: PropTypes.func,
};

export default GroupDistributions;
