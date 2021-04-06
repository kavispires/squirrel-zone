import React, { useEffect, useState } from 'react';

// Design Resources
import { Button, Divider, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Temp
import sampleGroupJson from '../../utils/mock/sampleGroup.json';
// Engine and utilities
import Previewer from '../../utils/distribution/previewer';
// Components
import AnimatedBars from '../distribution/AnimatedBars';
import { buildMockDistribution } from '../../utils';

const { Paragraph } = Typography;

function Preview({ playerRef }) {
  const [song] = useDistributorState('song');
  const [parts] = useDistributorState('parts');
  const [step, setStep] = useDistributorState('step');

  const [sampleGroup] = useState(sampleGroupJson);
  const [previewMembers, setPreviewMembers] = useState([]);
  const [previewBars, setPreviewBars] = useState([]);
  const [previewLyrics, setPreviewLyrics] = useState({});

  useEffect(() => {
    if (step === '3') {
      const preview = new Previewer({
        songTitle: song.title ?? 'Untitled',
        allParts: song.allPartsIds.map((partId) => parts[partId].data),
        members: sampleGroup.members,
        distribution: buildMockDistribution(parts).data,
      });
      setPreviewMembers(preview.members());
      setPreviewBars(preview.bars());
      setPreviewLyrics(preview.lyrics());
    }
  }, [step, parts, song, sampleGroup.members]);

  return (
    <section className="preview">
      <h2 className="preview__title">Preview</h2>
      <Paragraph>Visualize how this songs plays.</Paragraph>

      {step === '3' && previewBars.length && (
        <AnimatedBars
          playerRef={playerRef}
          members={previewMembers}
          bars={previewBars}
          lyrics={previewLyrics}
        />
      )}

      <Divider />

      <div className="lyrics-and-sections__action">
        <Button type="primary" onClick={() => setStep('4')}>
          Next Step: Song Metadata
        </Button>
      </div>
    </section>
  );
}

export default Preview;
