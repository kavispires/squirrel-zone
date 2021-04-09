import React, { useCallback } from 'react';

import { Radio } from 'antd';

import useCharacterState from '../../../states/useCharacterState';

import PROPS from '../../../utils/properties';
import DEFAULTS from '../../../utils/properties/defaults';
import { printProps } from '../../../utils';

const EYES = Object.values(PROPS.HEAD.EYES);

function EyeColorSelector() {
  const [eyeColor, setEyeColor] = useCharacterState('eyeColor');

  const onChange = useCallback(
    (e) => {
      setEyeColor(e?.target?.value ?? DEFAULTS.HEAD.EYES);
    },
    [setEyeColor]
  );

  printProps(EYES, 'EYES');

  return (
    <div className="character-option character-option--radios">
      <label htmlFor="eye">Eye Color:</label>
      <Radio.Group onChange={onChange} value={eyeColor} name="eye">
        {EYES.map((swatch) => {
          return (
            <Radio.Button
              key={`eye-color-swatch-${swatch.id}`}
              value={swatch.dna}
              className="color-swatch-radio"
              checked={swatch.dna === eyeColor}
            >
              <span className={`color-swatch eye-color-bg-${swatch.id}`} title={`Eye Color ${swatch.name}`} />
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
}

export default EyeColorSelector;
