import React from 'react';

export const EYE_VARIATION = {
  'EYE_VARIATION.SIMPLE.NONE': {
    id: 'EYE_VARIATION.SIMPLE.NONE',
    type: 'feature',
    category: 'EYE_VARIATION',
    group: 'SIMPLE',
    name: 'NONE',
    rate: 70,
    value: () => (
      <g>
        <g></g>
      </g>
    ),
  },
  'EYE_VARIATION.NATURAL.DARK_CIRCLES': {
    id: 'EYE_VARIATION.NATURAL.DARK_CIRCLES',
    type: 'feature',
    category: 'EYE_VARIATION',
    group: 'NATURAL',
    name: 'DARK_CIRCLES',
    rate: 15,
    value: () => (
      <g>
        <ellipse
          style={{ opacity: 0.3, fill: '#000000' }}
          cx="477.8"
          cy="364.3"
          rx="59.7"
          ry="72.9"
          transform="rotate(-82.045 477.81379237 364.31710774)"
        />
        <ellipse
          style={{ opacity: 0.3, fill: '#000000' }}
          cx="648.7"
          cy="363"
          rx="57.2"
          ry="52.9"
          transform="matrix(.1052 -.9945 .9945 .1052 219.4876 969.8867)"
        />
      </g>
    ),
  },
  'EYE_VARIATION.ACCENT.EYE_LINER': {
    id: 'EYE_VARIATION.ACCENT.EYE_LINER',
    type: 'feature',
    category: 'EYE_VARIATION',
    group: 'ACCENT',
    name: 'EYE_LINER',
    rate: 10,
    value: () => (
      <g>
        <ellipse cx="478.8" cy="353.8" rx="74" ry="65.2" />
        <path d="M649.7 288.6c-29.3 0-53.1 29.3-53.1 65.2 0 36 23.8 65.2 53.1 65.2s53.1-29.3 53.1-65.2c-.1-36-23.9-65.2-53.1-65.2z" />
      </g>
    ),
  },
  'EYE_VARIATION.MAKEUP.EYE_SHADOW': {
    id: 'EYE_VARIATION.MAKEUP.EYE_SHADOW',
    type: 'feature',
    category: 'EYE_VARIATION',
    group: 'MAKEUP',
    name: 'EYE_SHADOW',
    rate: 5,
    value: (mainColor) => (
      <g>
        <ellipse style={{ opacity: 0.7, ...mainColor }} class="st0" cx="478.8" cy="347.5" rx="74" ry="66.3" />
        <path
          style={{ opacity: 0.7, ...mainColor }}
          d="M649.7,281.3c-29.3,0-53.1,29.7-53.1,66.3s23.8,66.3,53.1,66.3c29.3,0,53.1-29.7,53.1-66.3
		S679,281.3,649.7,281.3z"
        />
      </g>
    ),
  },
};
