import React, { useCallback } from 'react';

// Design Resources
import { Input, Button } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import { Line, Part, Section, Song } from '../../utils/distributor';
// Temp
import sampleSong from '../../utils/mock/sampleSong.json';

function LoadSong() {
  const [, setSong] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [, setLines] = useDistributorState('lines');
  const [, setParts] = useDistributorState('parts');
  const [, setSections] = useDistributorState('sections');
  const [videoId, setVideoId] = useDistributorState('videoId');

  const onAddVideoId = useCallback(
    (event) => {
      const { value } = event.target;
      setVideoId(value);
      setSong(new Song({ videoId: value }));
      setStep(1);
    },
    [setSong, setStep, setVideoId]
  );

  const onLoadSong = useCallback(() => {
    console.log('SAMPLE SONG', sampleSong);
    const newSong = new Song(sampleSong.data);

    // Created instances looping through included data
    const newSections = {};
    const newLines = {};
    const newParts = {};
    sampleSong.included.forEach((entry) => {
      if (entry.type === 'section') {
        const newInstance = new Section(entry);
        return (newSections[newInstance.id] = newInstance);
      }
      if (entry.type === 'line') {
        const newInstance = new Line(entry);
        return (newLines[newInstance.id] = newInstance);
      }
      if (entry.type === 'part') {
        const newInstance = new Part(entry);
        return (newParts[newInstance.id] = newInstance);
      }
    });

    setParts(newParts);
    setLines(newLines);
    setSections(newSections);
    setSong(newSong);
    setVideoId(newSong.videoId);
    setStep(newSong.isComplete ? 3 : 2);
  }, [setSong, setVideoId, setSections, setLines, setParts, setStep]);

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
      <Button type="primary" onClick={onLoadSong}>
        Load Song
      </Button>
    </div>
  );
}

export default LoadSong;
