import React, { useCallback } from 'react';

// Design Resources
import { Button, Input, message, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Models
import { Song } from '../../models';
// Components
import LoadSongModal from '../modals/LoadSongModal';
import { extractYoutubeIdFromUrl } from '../../utils';

function LoadSong() {
  const [song, setSong] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [videoId, setVideoId] = useDistributorState('videoId');

  const parseYoutubeLink = useCallback(
    (event) => {
      const value = event?.target?.value;

      try {
        const newVideoId = extractYoutubeIdFromUrl(value);
        setVideoId(newVideoId);
      } catch (error) {
        message.error(`Failed to parse youtube link error, ${error}`);
      }
    },
    [setVideoId]
  );

  const startDistributorProcess = useCallback(() => {
    if (!videoId) {
      message.error('A youtube video id is required to proceed');
      return;
    }

    if (!song?.id) {
      setSong(new Song({ videoId }));
    }

    setStep(1);
  }, [setSong, setStep, videoId, song?.id]);

  return (
    <div className="load-song">
      <Typography.Title level={2} className="load-song__title">
        How to Start
      </Typography.Title>
      <div className="load-song__container">
        <div className="load-song__option">
          <Typography.Title level={3} className="load-song__title">
            Start Fresh
          </Typography.Title>
          <Typography.Text>Create a new Song by pasting a new youtube link</Typography.Text>
          <Input
            onPressEnter={parseYoutubeLink}
            placeholder="Insert Youtube video id or youtube link"
            onChange={parseYoutubeLink}
            className="load-song__input"
          />
          <Button onClick={parseYoutubeLink} disabled={!videoId} type="primary">
            Parse
          </Button>
        </div>

        <span className="load-song__separator">or</span>

        <div className="load-song__option">
          <Typography.Title level={3} className="load-song__title">
            Previously Created Song
          </Typography.Title>
          <Typography.Text>Click on the button below to edit a previously created song.</Typography.Text>
          <LoadSongModal className="load-song__button" />
        </div>
      </div>

      <div className="load-song__summary">
        <Typography.Paragraph>
          You've selected the following youtube video id. If everything checks out, you may go to the next
          step.
          <br />
          You can also edit the video id here in case you have loaded a song and wants a new video attached to
          it.
        </Typography.Paragraph>
        <Input
          value={videoId}
          onPressEnter={(e) => setVideoId(e.target.value)}
          className="load-song__input"
          onChange={(e) => setVideoId(e.target.value)}
        />
        <Button
          onClick={startDistributorProcess}
          disabled={!videoId}
          type="primary"
          className="load-song__button"
        >
          {song?.id && videoId ? 'Continue with this Song' : videoId ? 'Create a new Song' : 'Start'}
        </Button>
      </div>
    </div>
  );
}

export default LoadSong;
