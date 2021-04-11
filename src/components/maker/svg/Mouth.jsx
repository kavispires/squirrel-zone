import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Mouth({ mouthId }) {
  return <g>{APPEARANCE.SHAPE.MOUTH[mouthId].value()}</g>;
}

Mouth.propTypes = {
  mouthId: PropTypes.string,
};

Mouth.defaultProps = {
  mouthId: getRandomAppearanceId('SHAPE', 'MOUTH'),
};

export default Mouth;
