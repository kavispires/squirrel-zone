import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function FacialHair({ facialHairId, hairColorId }) {
  return (
    <g>
      {APPEARANCE.FEATURE.FACIAL_HAIR[facialHairId].value({ fill: APPEARANCE.COLOR.HAIR[hairColorId].value })}
    </g>
  );
}

FacialHair.propTypes = {
  eyeLidsId: PropTypes.string,
  furId: PropTypes.string,
};

FacialHair.defaultProps = {
  facialHairId: getRandomAppearanceId('FEATURE', 'FACIAL_HAIR'),
  hairColorId: getRandomAppearanceId('COLOR', 'HAIR'),
};

export default FacialHair;
