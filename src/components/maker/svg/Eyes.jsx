import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Eyes({ eyeColorId }) {
  return (
    <g>{APPEARANCE.BASE.EYES['EYES.EYES.EYES'].value({ fill: APPEARANCE.COLOR.EYE[eyeColorId].value })}</g>
  );
}

Eyes.propTypes = {
  eyeColorId: PropTypes.string,
};

Eyes.defaultProps = {
  eyeColorId: getRandomAppearanceId('COLOR', 'EYE'),
};

export default Eyes;
