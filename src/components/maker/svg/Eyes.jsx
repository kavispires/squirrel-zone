import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Eyes({ eyeColorId }) {
  const eyeColorStyle = { fill: APPEARANCE.COLOR.EYE[eyeColorId].value };

  return (
    <g data-svg-name="eyes">
      <g data-svg-name="right-eye">
        <g data-svg-name="right-eyeball">
          <ellipse className="svg-squirrel-eye-ball" cx="478.8" cy="355.8" rx="70.6" ry="56.6" />
          <path
            className="svg-squirrel-base-fill"
            d="M478.8 415.6c-40.7 0-73.8-26.8-73.8-59.8s33.1-59.8 73.8-59.8c40.7 0 73.8 26.8 73.8 59.8s-33 59.8-73.8 59.8zm0-113.2c-37.1 0-67.4 23.9-67.4 53.3s30.2 53.3 67.4 53.3 67.4-23.9 67.4-53.3-30.2-53.3-67.4-53.3z"
          />
        </g>
        <g data-svg-name="right-eye-pupil">
          <circle cx="472.5" style={eyeColorStyle} cy="359.2" r="29.6" />
          <path
            className="svg-squirrel-base-fill"
            d="M472.5 392c-18.1 0-32.8-14.7-32.8-32.8s14.7-32.8 32.8-32.8 32.8 14.7 32.8 32.8-14.7 32.8-32.8 32.8zm0-59.1c-14.5 0-26.3 11.8-26.3 26.3s11.8 26.3 26.3 26.3 26.3-11.8 26.3-26.3-11.7-26.3-26.3-26.3z"
          />
        </g>
      </g>
      <g data-svg-name="left-eye">
        <g data-svg-name="left-eyeball">
          <ellipse className="svg-squirrel-eye-ball" cx="649.7" cy="355.8" rx="49.7" ry="56.6" />
          <path
            className="svg-squirrel-base-fill"
            d="M649.7 415.6c-29.2 0-52.9-26.8-52.9-59.8s23.7-59.8 52.9-59.8 52.9 26.8 52.9 59.8-23.7 59.8-52.9 59.8zm0-113.2c-25.6 0-46.4 23.9-46.4 53.3s20.8 53.3 46.4 53.3c25.6 0 46.4-23.9 46.4-53.3s-20.8-53.3-46.4-53.3z"
          />
        </g>
        <g data-svg-name="left-eye-pupil">
          <circle cx="637.9" style={eyeColorStyle} cy="360" r="24.9" />
          <path
            className="svg-squirrel-base-fill"
            d="M637.9 388.2c-15.5 0-28.2-12.6-28.2-28.2s12.6-28.2 28.2-28.2c15.5 0 28.2 12.6 28.2 28.2s-12.7 28.2-28.2 28.2zm0-49.9c-12 0-21.7 9.7-21.7 21.7s9.7 21.7 21.7 21.7 21.7-9.7 21.7-21.7-9.8-21.7-21.7-21.7z"
          />
        </g>
      </g>
    </g>
  );
}

Eyes.propTypes = {
  eyeColorId: PropTypes.string,
};

Eyes.defaultProps = {
  eyeColorId: getRandomAppearanceId('COLOR', 'EYE'),
};

export default Eyes;
