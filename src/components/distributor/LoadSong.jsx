import React, { useCallback } from 'react';

// Design Resources
import { Input } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import { Song } from '../../utils/distributor';
// Components
import LoadSongModal from '../modals/LoadSongModal';

function LoadSong() {
  const [, setSong] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [videoId, setVideoId] = useDistributorState('videoId');

  const onAddVideoId = useCallback(
    (event) => {
      const { value } = event.target;
      setVideoId(value);
      setSong(new Song({ videoId: value }));
      setStep('1');
    },
    [setSong, setStep, setVideoId]
  );

  return (
    <div className="load-song">
      <h2 className="load-song__title">Load Song</h2>
      <Input
        addonBefore="https://www.youtube.com/watch?v="
        defaultValue={videoId}
        onPressEnter={onAddVideoId}
        placeholder="Insert Youtube video id"
      />
      <span className="load-song__separator">or</span>
      <LoadSongModal />
    </div>
  );
}

export default LoadSong;
