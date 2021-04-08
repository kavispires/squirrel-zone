import React, { useEffect, useState } from 'react';

// Design Resources
import { Button, Divider, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Temp
import sampleGroupJson from '../../utils/mock/sampleGroup.json';
// Models
import { Previewer } from '../../models';
// Components
import ViewAnimatedBars from '../distribution/ViewAnimatedBars';
import { buildMockDistribution } from '../../utils';

function Preview({ playerRef }) {
  const [song] = useDistributorState('song');
  const [parts] = useDistributorState('parts');
  const [step, setStep] = useDistributorState('step');

  const [sampleGroup] = useState(sampleGroupJson);
  const [previewMembers, setPreviewMembers] = useState([]);
  const [previewBars, setPreviewBars] = useState([]);
  const [previewLyrics, setPreviewLyrics] = useState({});

  useEffect(() => {
    if (step === 3) {
      const preview = new Previewer({
        songTitle: song.title ?? 'Untitled',
        partsData: song.allPartsIds.map((partId) => parts[partId].data),
        members: sampleGroup.members,
        distribution: buildMockDistribution(parts),
      });
      setPreviewMembers(preview.members());
      setPreviewBars(preview.bars());
      setPreviewLyrics(preview.lyrics());
    }
  }, [step, parts, song, sampleGroup.members]);

  return (
    <section className="preview">
      <Typography.Title level={2} className="preview__title">
        Preview
      </Typography.Title>

      <Typography.Paragraph>Visualize how this songs plays.</Typography.Paragraph>

      {Boolean(previewBars.length) && (
        <ViewAnimatedBars
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
