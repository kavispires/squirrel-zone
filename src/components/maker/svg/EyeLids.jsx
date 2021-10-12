import React from 'react';
import PropTypes from 'prop-types';

import { APPEARANCE, getRandomAppearanceId } from '../../../utils/maker/appearance';

function EyeLids({ eyeLidsId, furId }) {
  return <g>{APPEARANCE.SHAPE.EYE_LID[eyeLidsId].value({ fill: APPEARANCE.COLOR.FUR[furId].value })}</g>;
}

EyeLids.propTypes = {
  eyeLidsId: PropTypes.string,
  furId: PropTypes.string,
};

EyeLids.defaultProps = {
  eyeLidsId: getRandomAppearanceId('SHAPE', 'EYE_LID'),
  furId: getRandomAppearanceId('COLOR', 'FUR'),
};

export default EyeLids;
