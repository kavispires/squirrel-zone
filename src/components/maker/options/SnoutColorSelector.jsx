import React, { useCallback } from 'react';

import { Radio } from 'antd';

import useCharacterState from '../../../states/useCharacterState';

import PROPS from '../../../utils/properties/';
import DEFAULTS from '../../../utils/properties/defaults';
import { printProps } from '../../../utils';

const SNOUTS = Object.values(PROPS.HEAD.SNOUT);

function SnoutColorSelector() {
  const [snoutColor, setSnoutColor] = useCharacterState('snoutColor');

  const onChange = useCallback(
    (e) => {
      setSnoutColor(e?.target?.value ?? DEFAULTS.HEAD.SNOUT);
    },
    [setSnoutColor]
  );

  printProps(SNOUTS, 'SNOUTS');

  return (
    <div className="character-option character-option--radios">
      <label htmlFor="snout">Snout Color:</label>
      <Radio.Group onChange={onChange} value={snoutColor} name="snout">
        {SNOUTS.map((swatch) => {
          return (
            <Radio.Button
              key={`snout-color-swatch-${swatch.id}`}
              value={swatch.dna}
              className="color-swatch-radio"
              checked={swatch.dna === snoutColor}
            >
              <span
                className={`color-swatch snout-color-bg-${swatch.id}`}
                title={`Snout Color ${swatch.name}`}
              />
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
}

export default SnoutColorSelector;
