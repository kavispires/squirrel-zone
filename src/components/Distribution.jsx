import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout } from 'antd';
// State
import useGlobalState from '../states/useGlobalState';
import useDistributorState from '../states/useDistributorState';
// Utilities
import Previewer from '../utils/distribution/previewer';
import { loadActiveMembers, loadSongState } from '../states/functions';
// Components
import LineDistribution from './distributor/LineDistribution';
import LoadingContainer from './global/LoadingContainer';

function Distribution() {
  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [song] = useDistributorState('song');
  const [isFullyLoaded] = useDistributorState('isFullyLoaded');
  const [loadedLineDistribution] = useGlobalState('loadedLineDistribution');
  const [lineDistribution] = useGlobalState('lineDistribution');
  const [parts] = useDistributorState('parts');

  const [previewMembers, setPreviewMembers] = useState([]);
  const [previewBars, setPreviewBars] = useState([]);
  const [previewLyrics, setPreviewLyrics] = useState({});

  // Run on mount
  useEffect(() => {
    // Redirect if there is no active group
    if (!activeGroup) {
      history.push('/groups');
      return;
    }

    // Load members
    async function loadContent() {
      await loadSongState(loadedLineDistribution.songId);
      await loadActiveMembers(activeGroup);
    }
    loadContent();
  }, []);

  useEffect(() => {
    if (isFullyLoaded && song && activeMembers && parts && Object.keys(parts).length && lineDistribution) {
      const preview = new Previewer({
        songTitle: song.title,
        allPartsIds: song.allPartsIds,
        parts,
        members: activeMembers,
        distribution: lineDistribution,
        framerate: 30,
      });
      setPreviewMembers(preview.members());
      setPreviewBars(preview.bars());
      setPreviewLyrics(preview.lyrics());
    }
  }, [isFullyLoaded, parts, song, activeMembers, lineDistribution]);

  const playerRef = useRef();

  return (
    <LoadingContainer forceLoading={!previewBars.length}>
      <Layout.Content className="container">
        <main className="main distribution">
          <h1>Line Distribution{song ? `: ${song.title}` : ''}</h1>
          <LineDistribution
            playerRef={playerRef}
            members={previewMembers}
            bars={previewBars}
            lyrics={previewLyrics}
          />
        </main>
      </Layout.Content>
    </LoadingContainer>
  );
}

export default Distribution;
