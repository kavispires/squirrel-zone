import React from 'react';
import basicStyles from '../../styles';

export const EYES = {
  'EYES.EYES.EYES': {
    id: 'EYES.EYES.EYES',
    type: 'base',
    category: 'EYES',
    group: 'EYES',
    name: 'EYES',
    rate: 100,
    value: (eyeColor) => (
      <g data-svg-name="eyes">
        <g data-svg-name="right">
          <g data-svg-name="globe">
            <ellipse style={basicStyles.eyeBallFill} cx="478.8" cy="355.8" rx="70.6" ry="56.6" />
            <path
              style={basicStyles.baseFill}
              d="M478.8,415.6c-40.7,0-73.8-26.8-73.8-59.8s33.1-59.8,73.8-59.8c40.7,0,73.8,26.8,73.8,59.8S519.6,415.6,478.8,415.6z
				 M478.8,302.4c-37.1,0-67.4,23.9-67.4,53.3s30.2,53.3,67.4,53.3s67.4-23.9,67.4-53.3S516,302.4,478.8,302.4z"
            />
          </g>
          <g data-svg-name="pupil">
            <circle style={eyeColor} cx="472.5" cy="359.2" r="29.6" />
            <path
              style={basicStyles.baseFill}
              d="M472.5,392c-18.1,0-32.8-14.7-32.8-32.8s14.7-32.8,32.8-32.8s32.8,14.7,32.8,32.8S490.6,392,472.5,392z M472.5,332.9
				c-14.5,0-26.3,11.8-26.3,26.3s11.8,26.3,26.3,26.3s26.3-11.8,26.3-26.3S487.1,332.9,472.5,332.9z"
            />
          </g>
        </g>
        <g data-svg-name="left">
          <g data-svg-name="globe">
            <ellipse style={basicStyles.eyeBallFill} cx="649.7" cy="355.8" rx="49.7" ry="56.6" />
            <path
              style={basicStyles.baseFill}
              d="M649.7,415.6c-29.2,0-52.9-26.8-52.9-59.8s23.7-59.8,52.9-59.8s52.9,26.8,52.9,59.8S678.9,415.6,649.7,415.6z
				 M649.7,302.4c-25.6,0-46.4,23.9-46.4,53.3s20.8,53.3,46.4,53.3c25.6,0,46.4-23.9,46.4-53.3S675.3,302.4,649.7,302.4z"
            />
          </g>
          <g data-svg-name="pupil">
            <circle style={eyeColor} cx="637.9" cy="360" r="24.9" />
            <path
              style={basicStyles.baseFill}
              d="M637.9,388.2c-15.5,0-28.2-12.6-28.2-28.2s12.6-28.2,28.2-28.2c15.5,0,28.2,12.6,28.2,28.2S653.4,388.2,637.9,388.2z
				 M637.9,338.3c-12,0-21.7,9.7-21.7,21.7s9.7,21.7,21.7,21.7s21.7-9.7,21.7-21.7S649.8,338.3,637.9,338.3z"
            />
          </g>
        </g>
      </g>
    ),
  },
};
