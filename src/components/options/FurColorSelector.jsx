import React, { useCallback } from 'react';

import { Radio } from 'antd';

import useCharacterState from '../../states/useCharacterState';

const FURS = new Array(15).fill(0).map((e, i) => e + i);

function FurColorSelector() {
  const [furColor, setFurColor] = useCharacterState('furColor');

  const onChange = useCallback((e) => {
    setFurColor(e?.target?.value ?? 0);
  });

  const options = { label: 'Fur Color' };

  return (
    <Radio.Group onChange={onChange} value={furColor} options={options}>
      {FURS.map((swatch) => {
        return (
          <Radio.Button
            key={`fur-color-swatch-${swatch}`}
            value={swatch}
            className="color-swatch-radio"
          >
            <span className={`color-swatch fur-color-bg-${swatch}`} title={`Fur Color ${swatch}`} />
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
}

export default FurColorSelector;
