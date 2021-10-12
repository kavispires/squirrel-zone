import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Body({ furId }) {
  return <g>{APPEARANCE.BASE.BODY['BODY.BODY.BODY'].value({ fill: APPEARANCE.COLOR.FUR[furId].value })}</g>;
}

Body.propTypes = {
  furId: PropTypes.string,
};

Body.defaultProps = {
  furId: getRandomAppearanceId('COLOR', 'FUR'),
};

export default Body;
