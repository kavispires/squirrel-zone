import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

// State
import useGlobalState from '../../states/useGlobalState';
import usePreviewState from '../../states/usePreviewState';
// Utilities
import { Previewer } from '../../models';
// Components
import ViewAnimatedBars from './ViewAnimatedBars';
import Loading from '../global/Loading';
import { useHistory } from 'react-router';

function LineDistributionView({ playerRef }) {
  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [activeDistribution] = useGlobalState('activeDistribution');
  const [activeDistributionData] = useGlobalState('activeDistributionData');
  const [activeSong] = useGlobalState('activeSong');
  const [activeSongData] = useGlobalState('activeSongData');
  // Preview State
  const [songId, setSongId] = usePreviewState('songId');
  const [distributionId, setDistributionId] = usePreviewState('distributionId');
  const [previewMembers, setPreviewMembers] = usePreviewState('previewMembers');
  const [previewBars, setPreviewBars] = usePreviewState('previewBars');
  const [previewLyrics, setPreviewLyrics] = usePreviewState('previewLyrics');
  const [wasDistributionEdited, setWasDistributionEdited] = usePreviewState('wasDistributionEdited');
  // Local state
  const [fixedSize, setFixedSize] = useState(null);

  useEffect(() => {
    if (history.location.search) {
      const [, size] = history.location.search.split('=');
      setFixedSize(Number(size));
    }
  }, [history.location.search]);

  const preview = useMemo(
    () =>
      new Previewer({
        songTitle: activeSong.title,
        distributionType: activeDistribution.name,
        groupName: activeGroup.name,
        songData: activeSongData,
        members: activeMembers,
        distribution: activeDistributionData,
        framerate: 30,
      }),
    [activeDistributionData, activeMembers, activeSong.title, activeSongData, activeDistribution, activeGroup]
  );

  useEffect(() => {
    if (
      (activeSong &&
        activeDistribution &&
        activeSongData &&
        activeDistributionData &&
        (activeSong.id !== songId || activeDistribution.id !== distributionId)) ||
      wasDistributionEdited
    ) {
      setPreviewMembers(preview.members());
      setPreviewBars(preview.bars());
      setPreviewLyrics(preview.lyrics());
      setSongId(activeSong.id);
      setDistributionId(activeDistribution.id);
      setWasDistributionEdited(false);
    }
  }, [
    preview,
    activeSong,
    activeDistribution,
    activeDistributionData,
    activeSongData,
    activeMembers,
    distributionId,
    songId,
    wasDistributionEdited,
    setDistributionId,
    setPreviewBars,
    setPreviewLyrics,
    setPreviewMembers,
    setSongId,
    setWasDistributionEdited,
  ]);

  if (!activeSong || !previewMembers.length || !previewBars.length || !previewLyrics.length) {
    return <Loading />;
  }

  return (
    <Fragment>
      <ViewAnimatedBars
        playerRef={playerRef}
        videoId={activeSong.videoId}
        members={previewMembers}
        bars={previewBars}
        lyrics={previewLyrics}
        framerate={30}
        className="line-distribution__animated-bars"
        fixedSize={fixedSize}
      />
    </Fragment>
  );
}

LineDistributionView.propTypes = {
  playerRef: PropTypes.any,
};

export default LineDistributionView;
