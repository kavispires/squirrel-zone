import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function FaceVariation({ faceVariationId, snoutId }) {
  return (
    <g>
      {APPEARANCE.FEATURE.FACE_VARIATION[faceVariationId].value({
        fill: APPEARANCE.COLOR.SNOUT[snoutId].value,
      })}
    </g>
  );
}

FaceVariation.propTypes = {
  faceVariationId: PropTypes.string,
  snoutId: PropTypes.string,
};

FaceVariation.defaultProps = {
  faceVariationId: getRandomAppearanceId('FEATURE', 'FACE_VARIATION'),
  snoutId: getRandomAppearanceId('COLOR', 'SNOUT'),
};

export default FaceVariation;
