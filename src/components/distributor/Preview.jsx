import React from 'react';

// Design Resources
import { Button, Divider, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Components
const { Paragraph } = Typography;

function Preview() {
  const [, setStep] = useDistributorState('step');

  return (
    <section className="preview">
      <h2 className="preview__title">Preview</h2>
      <Paragraph>
        Visualize how this songs plays. For sampling purposes, Assignee E is considered ALL.
      </Paragraph>

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
