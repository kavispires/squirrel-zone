import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout, Spin } from 'antd';
// State
import useGlobalState from '../states/useGlobalState';
import useDistributorState from '../states/useDistributorState';
// Utilities
import { Previewer } from '../utils/distributor';
import { loadActiveMembers, loadSongState } from '../states/functions';
// Components

import LineDistribution from './distributor/LineDistribution';

function Distribution() {
  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [song] = useDistributorState('song');
  const [isFullyLoaded] = useDistributorState('isFullyLoaded');
  const [loadedLineDistribution] = useGlobalState('loadedLineDistribution');
  const [lineDistribution] = useGlobalState('lineDistribution');
  const [parts] = useDistributorState('parts');
  // const [stats, setStats] = useGlobalState('stats');

  const [previewData, setPreviewData] = useState([]);

  // Run on mount
  useEffect(() => {
    // Redirect if there is no active group
    if (!activeGroup) {
      history.push('/groups');
      return;
    }

    // Load members
    async function loadContent() {
      console.log('loading song state');
      await loadSongState(loadedLineDistribution.songId);
      console.log('loading members state');
      await loadActiveMembers(activeGroup);
    }
    loadContent();
  }, []);

  useEffect(() => {
    console.log('building previewer', isFullyLoaded);
    if (isFullyLoaded && song && activeMembers && parts && Object.keys(parts).length && lineDistribution) {
      const preview = new Previewer({
        song,
        parts,
        members: activeMembers,
        distribution: lineDistribution,
        framerate: 30,
      });
      setPreviewData(preview.build());
    }
  }, [isFullyLoaded, parts, song, activeMembers, lineDistribution]);

  const playerRef = useRef();

  if (!previewData.length) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout.Content className="container">
      <main className="main distribution">
        <h1>Line Distribution{song ? `: ${song.title}` : ''}</h1>
        <LineDistribution playerRef={playerRef} lineDistributionData={previewData} />
      </main>
    </Layout.Content>
  );
}

export default Distribution;
