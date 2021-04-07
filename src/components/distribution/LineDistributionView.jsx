import React, { useEffect } from 'react';

// State
import useGlobalState from '../../states/useGlobalState';
import usePreviewState from '../../states/usePreviewState';
// Utilities
import { Previewer } from '../../models';
// Components
import ViewAnimatedBars from './ViewAnimatedBars';
import Loading from '../global/Loading';

function LineDistributionView({ playerRef }) {
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

  useEffect(() => {
    if (
      activeSong &&
      activeDistribution &&
      activeSongData &&
      activeDistributionData &&
      (activeSong.id !== songId || activeDistribution.id !== distributionId)
    ) {
      const preview = new Previewer({
        songTitle: activeSong.title,
        songData: activeSongData,
        members: activeMembers,
        distribution: activeDistributionData,
        framerate: 30,
      });
      setPreviewMembers(preview.members());
      setPreviewBars(preview.bars());
      setPreviewLyrics(preview.lyrics());
      setSongId(activeSong.id);
      setDistributionId(activeDistribution.id);
    }
  }, [activeSong, activeDistribution, activeSongData, activeDistributionData]);

  if (!activeSong || !previewMembers.length || !previewBars.length || !previewLyrics.length) {
    return <Loading />;
  }

  return (
    <ViewAnimatedBars
      playerRef={playerRef}
      videoId={activeSong.videoId}
      members={previewMembers}
      bars={previewBars}
      lyrics={previewLyrics}
      framerate={30}
      className="line-distribution__animated-bars"
    />
  );
}

export default LineDistributionView;
