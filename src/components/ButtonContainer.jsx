import React from 'react';
import PropTypes from 'prop-types';

// Utilities
import { bemClass } from '../utils';

function ButtonContainer({ alignment, children, customClass, spacing, width }) {
  return (
    <div className={`${bemClass('button-container', alignment, width, spacing)} ${customClass}`}>
      {children}
    </div>
  );
}

ButtonContainer.propTypes = {
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  customClass: PropTypes.string,
  spacing: PropTypes.oneOf(['tight', 'wide']),
  width: PropTypes.oneOf(['full', 'half', 'third', 'quarter']),
};

ButtonContainer.defaultProps = {
  alignment: 'left',
  customClass: '',
  spacing: 'tight',
  width: 'full',
};

export default ButtonContainer;
