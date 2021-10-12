import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Mouth({ mouthId, snoutId }) {
  return <g>{APPEARANCE.SHAPE.MOUTH[mouthId].value({ fill: APPEARANCE.COLOR.SNOUT[snoutId].value })}</g>;
}

Mouth.propTypes = {
  mouthId: PropTypes.string,
  snoutId: PropTypes.string,
};

Mouth.defaultProps = {
  mouthId: getRandomAppearanceId('SHAPE', 'MOUTH'),
  snoutId: getRandomAppearanceId('COLOR', 'SNOUT'),
};

export default Mouth;
