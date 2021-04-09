import React, { useCallback } from 'react';

import { Radio } from 'antd';

import useCharacterState from '../../../states/useCharacterState';

import PROPS from '../../../utils/properties/';
import DEFAULTS from '../../../utils/properties/defaults';
import { printProps } from '../../../utils';

const NOSES = Object.values(PROPS.HEAD.NOSE);

function NoseColorSelector() {
  const [noseColor, setNoseColor] = useCharacterState('noseColor');

  const onChange = useCallback(
    (e) => {
      setNoseColor(e?.target?.value ?? DEFAULTS.HEAD.NOSE);
    },
    [setNoseColor]
  );

  printProps(NOSES, 'NOSES');

  return (
    <div className="character-option character-option--radios">
      <label htmlFor="nose">Nose Color:</label>
      <Radio.Group onChange={onChange} value={noseColor} name="nose">
        {NOSES.map((swatch) => {
          return (
            <Radio.Button
              key={`nose-color-swatch-${swatch.id}`}
              value={swatch.dna}
              className="color-swatch-radio"
              checked={swatch.dna === noseColor}
            >
              <span
                className={`color-swatch nose-color-bg-${swatch.id}`}
                title={`Nose Color ${swatch.name}`}
              />
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
}

export default NoseColorSelector;
