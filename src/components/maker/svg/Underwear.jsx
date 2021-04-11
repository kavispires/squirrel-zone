import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId, getRandomColor } from '../../../utils/maker/appearance';

function Underwear({ underwearId, mainColor }) {
  return <g>{APPEARANCE.ACCESSORY.UNDERWEAR[underwearId].value({ fill: mainColor })}</g>;
}

Underwear.propTypes = {
  underwearId: PropTypes.string,
  mainColor: PropTypes.string,
};

Underwear.defaultProps = {
  underwearId: getRandomAppearanceId('ACCESSORY', 'UNDERWEAR'),
  mainColor: getRandomColor(),
};

export default Underwear;
