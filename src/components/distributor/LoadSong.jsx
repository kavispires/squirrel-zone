import React, { useCallback, useState } from 'react';

// Design Resources
import { Button, Input } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Models
import { Song } from '../../models';
// Components
import LoadSongModal from '../modals/LoadSongModal';

function LoadSong() {
  const [, setSong] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [videoId, setVideoId] = useDistributorState('videoId');
  const [tempVideoId, setTempVideoId] = useState(videoId);

  const onAddVideoId = useCallback(
    (event) => {
      const value = event?.target?.value ?? tempVideoId;

      if (!value) {
        alert('Invalid video id');
        return;
      }

      setVideoId(value);
      setSong(new Song({ videoId: value }));
      setStep('1');
    },
    [setSong, setStep, setVideoId, tempVideoId]
  );

  return (
    <div className="load-song">
      <h2 className="load-song__title">Load Song</h2>
      <Input
        addonBefore="https://www.youtube.com/watch?v="
        defaultValue={videoId}
        onPressEnter={onAddVideoId}
        placeholder="Insert Youtube video id"
        onChange={(e) => setTempVideoId(e.target.value)}
      />
      <Button onClick={onAddVideoId} disabled={!tempVideoId} type="primary">
        Start
      </Button>
      <span className="load-song__separator">or</span>
      <LoadSongModal />
    </div>
  );
}

export default LoadSong;
