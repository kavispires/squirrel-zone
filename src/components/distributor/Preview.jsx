import React, { useEffect, useState } from 'react';

// Design Resources
import { Button, Divider, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Temp
import sampleGroupJson from '../../utils/mock/sampleGroup.json';
// Engine and utilities
import { Previewer } from '../../utils/distributor';
// Components
import LineDistribution from './LineDistribution';
import { buildMockDistribution } from '../../utils';
const { Paragraph } = Typography;

function Preview({ playerRef, playVideo, pauseVideo, seekAndPlay }) {
  const [song] = useDistributorState('song');
  const [parts] = useDistributorState('parts');
  const [, setStep] = useDistributorState('step');
  const [previewData, setPreviewData] = useState([]);
  const [sampleGroup] = useState(sampleGroupJson);

  useEffect(() => {
    const preview = new Previewer({
      song,
      parts,
      members: sampleGroup.members,
      distribution: buildMockDistribution(parts).data,
      framerate: 30,
    });

    setPreviewData(preview.build());
  }, []);

  return (
    <section className="preview">
      <h2 className="preview__title">Preview</h2>
      <Paragraph>
        Visualize how this songs plays. For sampling purposes, Assignee E is considered ALL.
      </Paragraph>

      <LineDistribution
        playerRef={playerRef}
        playVideo={playVideo}
        pauseVideo={pauseVideo}
        seekAndPlay={seekAndPlay}
        lineDistributionData={previewData}
      />

      <Divider />

      <div className="lyrics-and-sections__action">
        <Button type="primary" onClick={() => setStep(4)}>
          Next Step: Song Metadata
        </Button>
      </div>
    </section>
  );
}

export default Preview;
