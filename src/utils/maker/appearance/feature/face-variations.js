import React from 'react';
import basicStyles from '../../styles';

export const FACE_VARIATION = {
  'FACE_VARIATION.SNOUT.NONE': {
    id: 'FACE_VARIATION.SNOUT.NONE',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SNOUT',
    name: 'NONE',
    rate: 16,
    value: () => (
      <g>
        <g></g>
      </g>
    ),
  },
  'FACE_VARIATION.SNOUT.FRECKLES': {
    id: 'FACE_VARIATION.SNOUT.FRECKLES',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SNOUT',
    name: 'FRECKLES',
    rate: 12,
    value: () => (
      <g>
        <path
          style={{ opacity: 0.2, fill: '#FF00FF' }}
          d="M549.4 432.9c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zm-7.4 4.8c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm19.5-6.2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5c0-.9-.7-1.5-1.5-1.5zm-7.5 14.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm1.5-8.1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-12 12.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-2.9 7.4c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm24.5-7.9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-48.5-13.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5c0-.9-.7-1.5-1.5-1.5zm-2.9 8.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm15.8-10.4c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-1.4 9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5c-.1-.9-.7-1.5-1.5-1.5zm24.2 14.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-22.8-5.9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm104.6-3.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-5.9 6.2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm18-3.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-6.3 6.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-7.3 7.8c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm14.4-1.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm14-22.8c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-13.3 1.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM637 436c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-14.7 8.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-3.8 16c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm35.7-4.4c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm13.3-3.1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"
        />
      </g>
    ),
  },
  'FACE_VARIATION.SNOUT.ROSACEA': {
    id: 'FACE_VARIATION.SNOUT.ROSACEA',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SNOUT',
    name: 'ROSACEA',
    rate: 8,
    value: () => (
      <g>
        <circle style={{ opacity: 0.1, fill: '#FF00AA' }} cx="494.8" cy="472.1" r="22.2" />
        <circle style={{ opacity: 0.1, fill: '#FF00AA' }} cx="659.6" cy="468.1" r="22.2" />
      </g>
    ),
  },
  'FACE_VARIATION.SNOUT.ACNE': {
    id: 'FACE_VARIATION.SNOUT.ACNE',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SNOUT',
    name: 'ACNE',
    rate: 4,
    value: () => (
      <g>
        <path
          style={{ opacity: 0.4, fill: '#301100' }}
          d="M513.1 440c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1zm-37.4 12.6c-1.7 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2-1.5-3.2-3.2-3.2zm14.2-3.1c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.8-1.6-1.6-1.6zm-17.4 32c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm21.8-15.5c-1.6 0-2.8 1.3-2.8 2.8 0 1.6 1.3 2.8 2.8 2.8 1.6 0 2.8-1.3 2.8-2.8 0-1.5-1.3-2.8-2.8-2.8zm15.7-13.4c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm144.5 34.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-12.1-46.5c-1.3 0-2.3 1-2.3 2.3 0 1.3 1 2.3 2.3 2.3 1.3 0 2.3-1 2.3-2.3.1-1.2-1-2.3-2.3-2.3zm-13.1 48c-1.3 0-2.3 1-2.3 2.3 0 1.3 1 2.3 2.3 2.3 1.3 0 2.3-1 2.3-2.3 0-1.3-1-2.3-2.3-2.3zm37.9-19.9c-.6 0-1.2.5-1.2 1.2 0 .6.5 1.2 1.2 1.2s1.2-.5 1.2-1.2-.6-1.2-1.2-1.2zm-12.7-9.9c-.6 0-1.2.5-1.2 1.2 0 .6.5 1.2 1.2 1.2.6 0 1.2-.5 1.2-1.2-.1-.7-.6-1.2-1.2-1.2z"
        />
      </g>
    ),
  },

  'FACE_VARIATION.MOLE.EYE': {
    id: 'FACE_VARIATION.MOLE.EYE',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'MOLE',
    name: 'EYE',
    rate: 12,
    value: () => (
      <g>
        <circle style={basicStyles.baseFill} cx="414.6" cy="402.4" r="3.1" />
      </g>
    ),
  },
  'FACE_VARIATION.MOLE.CHEEK': {
    id: 'FACE_VARIATION.MOLE.CHEEK',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'MOLE',
    name: 'CHEEK',
    rate: 9,
    value: () => (
      <g>
        <circle style={basicStyles.baseFill} cx="502.1" cy="442.4" r="3.1" />
      </g>
    ),
  },
  'FACE_VARIATION.MOLE.NOSE': {
    id: 'FACE_VARIATION.MOLE.NOSE',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'MOLE',
    name: 'NOSE',
    rate: 6,
    value: () => (
      <g>
        <circle style={basicStyles.baseFill} cx="616.1" cy="465" r="3.1" />
      </g>
    ),
  },
  'FACE_VARIATION.MOLE.FOREHEAD': {
    id: 'FACE_VARIATION.MOLE.FOREHEAD',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'MOLE',
    name: 'FOREHEAD',
    rate: 3,
    value: () => (
      <g>
        <circle style={basicStyles.baseFill} cx="600.6" cy="310.4" r="3.1" />
      </g>
    ),
  },

  'FACE_VARIATION.BIRTHMARK.MINIMAL': {
    id: 'FACE_VARIATION.BIRTHMARK.MINIMAL',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'BIRTHMARK',
    name: 'MINIMAL',
    rate: 8,
    value: () => (
      <g>
        <path
          style={{ opacity: 0.1, fill: '#000000' }}
          d="M686.2 419.6c-.1 1.6.3 3.4.1 5-.2 1.5-1.3 2.7-2.1 4s-1.5 2.9-.9 4.2c.7 1.4 2.6 1.9 4.1 1.5 1.5-.4 2.7-1.6 3.9-2.7 3-3.1 5.1-7.1 4-11.6-.7-2.9-3.7-5.5-6.9-4-1.6.9-2.1 2.2-2.2 3.6z"
        />
      </g>
    ),
  },
  'FACE_VARIATION.BIRTHMARK.SMALL': {
    id: 'FACE_VARIATION.BIRTHMARK.SMALL',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'BIRTHMARK',
    name: 'SMALL',
    rate: 6,
    value: () => (
      <g>
        <path
          style={{ opacity: 0.1, fill: '#000000' }}
          d="M589.3 308.8c.8-1.9 1.6-3.8 1.9-5.8.4-2.4.1-5-1.3-6.9-1.3-1.8-3.4-2.9-5.5-3.6-6.7-2.5-15.2-2.4-22.2-1.5-3.9.5-7.9 2.6-9.6 6.2-1.1 2.4-1.1 5.2-1 7.9.3 6.4 14.8 24.8 22.3 24.2 9.5-.6 11.9-12.6 14.9-19.5.2-.3.4-.7.5-1z"
        />
      </g>
    ),
  },
  'FACE_VARIATION.BIRTHMARK.NOTICEABLE': {
    id: 'FACE_VARIATION.BIRTHMARK.NOTICEABLE',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'BIRTHMARK',
    name: 'NOTICEABLE',
    rate: 4,
    value: () => (
      <g>
        <path
          style={{ opacity: 0.1, fill: '#000000' }}
          d="M463.8 444.9c.5.8 1.1 1.6 1.6 2.3-5 3.4-9.7 7.4-13.8 11.9-3.6 3.9-6.8 8.1-9.7 12.5-13.4-10.6-23.1-27.1-27.8-43.3-2.2-7.4-4.9-16.6-12.5-17.9-1.2-.2-2.6-.2-3.6-.9-1.7-1.1-1.9-3.3-2-5.3l-.9-18.3c3.8-3.7 7.1-8.5 7.4-13.9.3-5.4-3.1-11.2-8.4-12.1-1.9-.3-3.8 0-5.7-.4-5.7-1.3-7.9-8.4-7.6-14.2s1.9-12-.3-17.4c-.3-2.7-.5-5.5-.8-8.2-.4-4.8-.9-9.5-1.9-14.2-1.9-8.2-5.6-16.5-3.7-24.7.8-3.4 2.5-6.5 4.3-9.6 3.3-5.9 6.7-11.8 10-17.7 3-5.3 6.1-10.8 11.1-14.4 4.9-3.6 12.2-4.7 17-1 5 3.8 5.6 11.3 4.1 17.4s-4.6 11.8-5.5 18.1c-1.7 11.9 4.7 23.6 4.6 35.7-.1 5.3-1.4 10.5-1.2 15.8.3 10.5 6.5 19.9 12.4 28.6 4.2 6.2 8.6 12.9 8.4 20.4-.2 7-4.5 13.2-7.2 19.7s-3.5 15.1 1.8 19.6c3 2.6 7.2 3.2 10.4 5.5 1.9 1.4 3.4 3.3 4.8 5.3 5 6.9 9.9 13.7 14.7 20.7z"
        />
      </g>
    ),
  },
  'FACE_VARIATION.BIRTHMARK.FULL': {
    id: 'FACE_VARIATION.BIRTHMARK.FULL',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'BIRTHMARK',
    name: 'FULL',
    rate: 2,
    value: () => (
      <g>
        <path
          style={{ opacity: 0.1, fill: '#000000' }}
          d="M417.7 406.4c2 5.4 3 11.4 6.8 15.7 2.9 3.3 7 5.2 9.9 8.4 4.3 4.7 5.2 12.2 2 17.8-3.2 5.5-10.3 8.5-16.4 6.8-4.9-1.4-8.6-5.3-11.8-9.2-6.6-8.2-12.7-18.2-14.7-28.7-1.5-8 1.6-21.7 12.2-21.7 5.8 0 10 5.5 12 10.9zm-23.6-97.7c2.2 1.3 5 .8 7.4-.1 5.7-2.2 10.6-6.1 16.1-8.9 6-3 12.8-4.6 19.6-4.4 4.4.1 8.8.9 13.2.2 4.4-.7 8.8-3.4 9.8-7.7 1.4-5.8-3.9-11-9-14.1-7.5-4.6-16.9-7.8-25.1-4.6-7.6 2.8-47.9 30-32 39.6zm182 49.8c1.3 5.4 4.1 10.3 7 15.1 3.6 6.1 7.3 12.3 12.8 16.7 4.5 3.6 10.3 5.9 16 5.2 4.7-.6 9-3.3 12.2-6.9 6-6.9 7.6-17.2 4-25.6-2.5-5.9-7.3-10.7-9.4-16.7-2.1-6.1-1.3-12.9-1.9-19.3-.8-8.4-4.1-16.5-9.4-23-3.3-4.1-7.6-7.6-12.6-9.2-5.8-1.9-15.2-.7-18.4 5.5-3.8 7.3-2.1 18.4-1.2 26.2 1.1 10.5-1.5 21.4.9 32zm116.6-97.7c-3.2-8.3-6.5-16.6-9.7-24.8-1.8-4.6-3.7-9.4-7.6-12.5-4.2-3.5-10.1-4.3-15.4-3.5-5.4.8-10.4 3.1-15.3 5.4l-7.2 3.3c-1.8.8-3.6 1.7-4.9 3.1-2.8 3.1-2.3 8.2.1 11.7s6.1 5.7 9.7 7.9c12.3 7.3 24.5 14.5 36.8 21.8 2.1 1.2 4.4 2.5 6.8 2.5 4.8 0 8.3-5.3 8.2-10.1-.1-4.8-2.7-9.2-5.2-13.3m-222.2-62.8c-6.7 5.6-9.5 16.5-3.8 23.1 3.9 4.5 10.2 5.7 16.1 6.6 9.6 1.5 19.4 2.9 28.1 7.1 6.5 3.1 12.6 7.9 19.8 8.3 4.7.2 9.2-1.5 13.4-3.6 7-3.5 14.1-9.2 14.1-17 .1-10.8-11-18.4-19.7-21.8-19.6-7.5-49.3-18.3-68-2.7z"
        />
      </g>
    ),
  },

  'FACE_VARIATION.SPECIAL.BUTT_CHIN': {
    id: 'FACE_VARIATION.SPECIAL.BUTT_CHIN',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SPECIAL',
    name: 'BUTT_CHIN',
    rate: 4,
    value: (snoutColor) => (
      <g>
        <path
          style={snoutColor}
          d="M582.6 520.6c2.4 3.9 2.8 8.9.9 13.1-1.8 4-5.5 6.7-9.5 8.2-5 1.8-8.8 1.5-12.9-2.1-2.5 2.5-5.4 4.7-8.7 5.9-5.7 2-11.6.3-16-3.8-4.6-4.2-6.9-11-6-17.1.4-2.5 1.5-4.9 3.4-6.5"
        />
        <path
          style={basicStyles.baseFill}
          d="M584.5 519.4c1.5 1.4 2.5 3.3 3 5.3.6 2 .6 4.1.3 6.2-.3 2.1-.9 4.1-2 6-1.1 1.9-2.5 3.5-4.1 4.8-1.6 1.3-3.3 2.4-5.1 3.2-1.8.8-3.6 1.4-5.8 1.8-2.1.3-4.6.2-6.8-.6s-4-2-5.5-3.4l5.1-.2c-1.7 1.9-3.7 3.6-5.9 5-1.1.7-2.3 1.3-3.6 1.8-1.3.5-2.7.9-4.1 1.1-2.9.4-5.8.1-8.5-.8s-5.1-2.4-7.1-4.2c-4.2-3.6-6.7-8.7-7.5-13.9-.4-2.6-.3-5.3.5-8s2.4-5.3 5-6.8c1-.6 2.3-.2 2.9.8.4.7.4 1.5 0 2.2l-.2.2c-.9 1.5-1.4 3.1-1.5 4.9-.1 1.8.1 3.7.4 5.5.7 3.7 2.8 7 5.5 9.3 1.4 1.2 3 2 4.6 2.6 1.6.5 3.3.7 4.9.4.8-.1 1.6-.3 2.4-.6.8-.3 1.6-.7 2.5-1.1 1.6-.9 3.1-2.2 4.6-3.5 1.4-1.3 3.6-1.4 5.1-.3 1.1.8 2.1 1.5 3.1 1.8 1 .3 2 .4 3.2.2 1.2-.2 2.6-.6 3.9-1.1 1.3-.5 2.5-1.2 3.5-2 2.1-1.6 3.4-3.6 3.9-6.2.3-1.3.2-2.6.2-3.9-.1-.7-.1-1.3-.2-2l-.4-2.1-.1-.3c-.2-1.3.6-2.5 1.9-2.7.6-.1 1.4.1 1.9.6z"
        />
      </g>
    ),
  },
  'FACE_VARIATION.SPECIAL.CHEEKS': {
    id: 'FACE_VARIATION.SPECIAL.CHEEKS',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SPECIAL',
    name: 'CHEEKS',
    rate: 3,
    value: () => (
      <g>
        <path
          style={{ fill: '#C47D78', opacity: 0.2 }}
          d="M471.6 459.8c3.5-5 7.8-9.4 12.4-13.4 4.7-4 10-7.4 15.9-9.7 5.9-2.4 12.7-3.2 19.1-1.6 6.4 1.6 11.9 5.7 15.8 10.6.6.7.4 1.7-.3 2.3-.6.5-1.5.5-2.1 0-4.4-3.7-9.2-6.7-14.6-7.8-2.6-.6-5.4-.7-8.1-.4-2.7.2-5.4.9-8.1 1.8-2.7.9-5.3 2.1-7.8 3.5s-5 2.9-7.4 4.6c-4.8 3.4-9.3 7.2-13.5 11.4-.4.4-1 .4-1.3 0-.3-.4-.3-.9 0-1.3z"
        />

        <path
          style={{ fill: '#C47D78', opacity: 0.3 }}
          d="M514 503.8c2.5 1.8 5.3 3.3 8.1 4.7 2.8 1.4 5.7 2.5 8.7 3.5 2.9 1 6 1.7 9 2.3 3 .5 6.1.8 9.2.9 3.1.1 6.1-.1 9.2-.5 3-.4 6.1-.9 9-1.7 6-1.5 11.8-3.8 17.5-6.5.9-.4 1.9 0 2.3.9.4.8.1 1.7-.6 2.1-5.3 3.9-11.4 6.8-17.8 8.8-.8.3-1.6.5-2.4.7l-2.4.6c-1.7.3-3.3.6-5 .8-1.7.2-3.4.3-5 .4-1.7 0-3.4 0-5.1-.1-6.7-.3-13.4-2-19.5-4.6-3.1-1.3-6-2.9-8.8-4.7-2.8-1.8-5.4-3.8-7.8-6.2-.4-.4-.4-1 0-1.4.4-.3 1-.3 1.4 0z"
        />

        <path
          style={{ fill: '#C47D78', opacity: 0.2 }}
          d="M671.1 466.8c-1.1-4.3-2.4-8.5-4.1-12.5-1.7-4-3.8-7.8-6.5-10.9-1.4-1.5-2.9-2.8-4.5-3.8-1.7-1-3.5-1.6-5.4-1.9-1.9-.3-3.9-.3-6 0s-4.1.9-6.2 1.5h-.1c-.8.2-1.6-.2-1.8-1-.2-.7.1-1.4.7-1.7 1-.6 2.1-1.2 3.1-1.6 1.1-.4 2.2-.9 3.4-1.2 2.3-.7 4.9-.9 7.4-.7 2.5.3 5.1 1.1 7.2 2.4 2.2 1.3 4.1 3 5.6 4.9 1.6 1.9 2.8 3.9 3.9 6.1 1.1 2.1 1.9 4.3 2.6 6.5 1.3 4.5 2.1 9 2.3 13.6 0 .5-.3.8-.8.9-.3.1-.7-.2-.8-.6z"
        />
      </g>
    ),
  },
  'FACE_VARIATION.SPECIAL.TATTOO': {
    id: 'FACE_VARIATION.SPECIAL.TATTOO',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SPECIAL',
    name: 'TATTOO',
    rate: 16,
    value: () => (
      <g>
        <path
          style={{ fill: '#2F2518', opacity: 0.8 }}
          d="M372.3 284.8h.2c1.3-.1 2.4-.9 2.9-2.1l8-22.4 29.8 45.4c.6.9 1.6 1.5 2.7 1.5.4 0 .7-.1 1.1-.2 1.3-.5 2.2-1.7 2.2-3.1v-.3l-8.1-89c-.1-1.1-.8-2.1-1.8-2.6-.5-.2-1-.3-1.4-.3-.6 0-1.2.2-1.7.5l-24.9 15.5-2-16.4c-8.9 18.8-14.4 38.5-17.5 56.2l7.8 15.6c.3 1 1.5 1.7 2.7 1.7z"
        />
        <path
          style={{ fill: '#2F2518', opacity: 0.8 }}
          d="M393 201.7c.5.2 1 .4 1.5.4s1-.1 1.4-.3l27-12.9 7.8 55.3c.2 1.6 1.6 2.8 3.2 2.8h.1c1.7-.1 3-1.4 3.1-3.1l4.4-79.8v-.2c0-.9-.4-1.8-1.1-2.4-.6-.6-1.4-.9-2.2-.9h-.5l-22.6 3.3-.9-1.1c-9.6 8.6-17.7 18.4-24.4 28.8l1.3 7.8c.3 1 .9 1.9 1.9 2.3z"
        />
      </g>
    ),
  },
  'FACE_VARIATION.SPECIAL.SCAR': {
    id: 'FACE_VARIATION.SPECIAL.SCAR',
    type: 'feature',
    category: 'FACE_VARIATION',
    group: 'SPECIAL',
    name: 'SCAR',
    rate: 1,
    value: () => (
      <g>
        <path
          style={{ fill: '#2F2518', opacity: 0.83 }}
          d="M448.1 273s1.6 137.7 47.7 188.9c0 0-41.5-92.9-47.7-188.9z"
        />
      </g>
    ),
  },
};
