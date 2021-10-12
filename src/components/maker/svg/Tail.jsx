import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function Tail({ tailId, furId }) {
  return <g>{APPEARANCE.SHAPE.TAIL[tailId].value({ fill: APPEARANCE.COLOR.FUR[furId].value })}</g>;
}

Tail.propTypes = {
  tailId: PropTypes.string,
  furId: PropTypes.string,
};

Tail.defaultProps = {
  tailId: getRandomAppearanceId('SHAPE', 'TAIL'),
  furId: getRandomAppearanceId('COLOR', 'FUR'),
};

export default Tail;
