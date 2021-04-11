import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId, getRandomColor } from '../../../utils/maker/appearance';

function EyeVariation({ eyeVariationId, mainColor }) {
  return <g>{APPEARANCE.FEATURE.EYE_VARIATION[eyeVariationId].value({ fill: mainColor })}</g>;
}

EyeVariation.propTypes = {
  eyeVariationId: PropTypes.string,
};

EyeVariation.defaultProps = {
  eyeVariationId: getRandomAppearanceId('FEATURE', 'EYE_VARIATION'),
  mainColor: getRandomColor(),
};

export default EyeVariation;
