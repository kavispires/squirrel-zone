import React from 'react';

import { Collapse } from 'antd';

import FurColorSelector from './options/FurColorSelector';
import SnoutColorSelector from './options/SnoutColorSelector';
import NoseColorSelector from './options/NoseColorSelector';
import EyeColorSelector from './options/EyeColorSelector';

function CharacterOptions() {
  const callback = (key) => {
    console.log(key);
  };

  return (
    <div className="options">
      <Collapse defaultActiveKey={['fur']} onChange={callback}>
        <Collapse.Panel header="Fur" key="fur">
          <FurColorSelector />
        </Collapse.Panel>
        <Collapse.Panel header="Face" key="face">
          <SnoutColorSelector />
          <NoseColorSelector />
          <EyeColorSelector />
        </Collapse.Panel>
        <Collapse.Panel header="Hair" key="hair">
          Something
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default CharacterOptions;
