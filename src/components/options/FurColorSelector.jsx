import React, { useCallback } from 'react';

import { Radio } from 'antd';

import useCharacterState from '../../states/useCharacterState';

import PROPS from '../../utils/properties/';

const FURS = Object.values(PROPS.FUR);

function FurColorSelector() {
  const [furColor, setFurColor] = useCharacterState('furColor');

  const onChange = useCallback((e) => {
    setFurColor(e?.target?.value ?? 0);
  });

  console.log(
    FURS.reduce((acc, f) => {
      return acc + f.rate;
    }, 0)
  );

  return (
    <div className="character-option character-option--radios">
      <label htmlFor="fur">Fur:</label>
      <Radio.Group onChange={onChange} value={furColor} name="fur">
        {FURS.map((swatch) => {
          return (
            <Radio.Button
              key={`fur-color-swatch-${swatch.id}`}
              value={swatch.dna}
              className="color-swatch-radio"
              checked={swatch.dna === furColor}
            >
              <span
                className={`color-swatch fur-color-bg-${swatch.id}`}
                title={`Fur Color ${swatch.name}`}
              />
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
}

export default FurColorSelector;
