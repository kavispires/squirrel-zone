import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Nose({ noseId }) {
  const noseColorStyle = { fill: APPEARANCE.COLOR.NOSE[noseId].value };

  return (
    <g data-sgv-name="nose">
      <path
        style={noseColorStyle}
        d="M599 416.5s17.4-.6 19.9 4.4-13.6 33.3-21.7 33.3-26.5-29.8-22.9-34.3c3.8-4.4 21.9-3.4 24.7-3.4z"
      />
      <path
        className="svg-squirrel-base-fill"
        d="M597.2 457.4c-8.5 0-19.8-17.9-23.7-26-3.2-6.9-3.8-11-1.7-13.6 3.7-4.5 14.5-4.9 25.5-4.6h1.5c5.9-.2 19.8 0 22.9 6.2.7 1.3 2.1 6.9-7.1 21.9-3.6 6.1-10.8 16.1-17.4 16.1zm-20.1-35.6c-.1 3 5.2 14 12.3 22.5 4.6 5.5 7.2 6.7 7.8 6.7 0 0 2.1-.1 6.6-5.5 7.2-8.7 12.4-20.5 12.1-23.3-1.3-1.6-9.3-2.8-16.8-2.5h-1.9c-15.1-.3-19 1.3-20.1 2.1zm.1-.3zm21.8-5z"
      />
    </g>
  );
}

Nose.propTypes = {
  noseId: PropTypes.string,
};

Nose.defaultProps = {
  noseId: getRandomAppearanceId('COLOR', 'NOSE'),
};

export default Nose;
