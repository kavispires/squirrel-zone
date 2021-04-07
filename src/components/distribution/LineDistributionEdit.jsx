import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// State
import useGlobalState from '../../states/useGlobalState';
import useLoadingState from '../../states/useLoadingState';
import useDistributorState from '../../states/useDistributorState';
import {
  loadSongStateOffline,
  resetStateForDistribution,
  setupNewActiveDistribution,
} from '../../states/functions';
// API
import API from '../../adapters';
// Utilities
import { DEFAULT_MEMBERS, DISTRIBUTION_NAME } from '../../utils/constants';
// Components
import EditDistributeWidget from './EditDistributeWidget';
import EditDistributeOptions from './EditDistributeOptions';

function LineDistributionEdit({ playerRef }) {
  const [isLoading] = useLoadingState('isLoading');

  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [activeDistribution] = useGlobalState('activeDistribution');
  const [activeDistributionData] = useGlobalState('activeDistributionData');
  const [activeSong] = useGlobalState('activeSong');
  const [activeSongData] = useGlobalState('activeSongData');

  const [parts] = useDistributorState('parts');

  const [localMembers] = useState({ ...activeMembers, ...DEFAULT_MEMBERS });
  const [stats, setStats] = useState({});
  const [assignedParts, setAssignedParts] = useState(activeDistributionData.assignedParts ?? {});
  const [distributionName, setDistributionName] = useState(
    activeDistribution?.name || DISTRIBUTION_NAME.ORIGINAL
  );

  useEffect(() => {
    async function loadContent() {
      await loadSongStateOffline(activeSong, activeSongData);
    }

    loadContent();
  }, []);

  const resetDistribution = () => {
    setupNewActiveDistribution({});
    setStats({});
    setDistributionName('');
    setAssignedParts({});
  };

  const updateName = (distributionName) => {
    setDistributionName(distributionName);
  };

  const saveDistribution = async () => {
    try {
      const response = await API.saveDistribution({
        id: activeDistribution?.id ?? null,
        type: 'distribution',
        name: distributionName || activeDistribution.name || DISTRIBUTION_NAME.ORIGINAL,
        songId: activeSong.id,
        songTitle: activeSong.title,
        groupId: activeGroup.id,
        assignedParts: assignedParts,
        stats,
      });

      resetStateForDistribution();
      history.push(`/distribution/${response.id}/view`);
    } catch (_) {}
  };

  return (
    <section className="line-distribution-edit">
      <EditDistributeWidget
        playerRef={playerRef}
        members={localMembers}
        stats={stats}
        setStats={setStats}
        assignedParts={assignedParts}
        setAssignedParts={setAssignedParts}
        parts={parts}
        activeGroup={activeGroup}
      />
      <EditDistributeOptions
        assignedParts={assignedParts}
        parts={parts}
        resetDistribution={resetDistribution}
        distributionName={distributionName}
        isLoading={isLoading}
        updateName={updateName}
        saveDistribution={saveDistribution}
        activeDistribution={activeDistribution}
      />
    </section>
  );
}

export default LineDistributionEdit;
