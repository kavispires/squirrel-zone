import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Head({ furId, snoutId }) {
  const furColorStyle = { fill: APPEARANCE.COLOR.FUR[furId].value };
  const snoutColorStyle = { fill: APPEARANCE.COLOR.SNOUT[snoutId].value };

  return <g>{APPEARANCE.BASE.HEAD['HEAD.HEAD.HEAD'].value(furColorStyle, snoutColorStyle)}</g>;
}

Head.propTypes = {
  furId: PropTypes.string,
  snoutId: PropTypes.string,
};

Head.defaultProps = {
  furId: getRandomAppearanceId('COLOR', 'FUR'),
  snoutId: getRandomAppearanceId('COLOR', 'SNOUT'),
};

export default Head;
