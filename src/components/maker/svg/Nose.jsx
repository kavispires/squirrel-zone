import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Nose({ noseId }) {
  return <g>{APPEARANCE.BASE.NOSE['NOSE.NOSE.NOSE'].value({ fill: APPEARANCE.COLOR.NOSE[noseId].value })}</g>;
}

Nose.propTypes = {
  noseId: PropTypes.string,
};

Nose.defaultProps = {
  noseId: getRandomAppearanceId('COLOR', 'NOSE'),
};

export default Nose;
