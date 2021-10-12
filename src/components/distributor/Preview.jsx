import React, { useEffect, useState } from 'react';

// Design Resources
import { Button, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Models
import { Previewer } from '../../models';
// Utilities
import { buildMockDistribution } from '../../utils';
import sampleGroupJson from '../../utils/mock/sampleGroup.json';
// Components
import ViewAnimatedBars from '../distribution/ViewAnimatedBars';
import StepActions from './StepActions';
import StepTitle from './StepTitle';

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
      <StepTitle>Preview</StepTitle>

      <Typography.Paragraph>Visualize how this songs plays.</Typography.Paragraph>

      {Boolean(previewBars.length) && (
        <ViewAnimatedBars
          playerRef={playerRef}
          members={previewMembers}
          bars={previewBars}
          lyrics={previewLyrics}
        />
      )}

      <StepActions>
        <Button type="primary" onClick={() => setStep(4)}>
          Next Step: Adjustments
        </Button>
      </StepActions>
    </section>
  );
}

export default Preview;
