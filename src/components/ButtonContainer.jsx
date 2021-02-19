import React from 'react';

// Utilities
import { bemClass, getBemModifier } from '../utils';

function ButtonContainer({ center, fullWidth, customClass, children }) {
  const centerClass = getBemModifier(center, 'centered');
  const fullWidthClass = getBemModifier(fullWidth, 'full-width');

  return (
    <div className={`${bemClass('button-container', fullWidthClass, centerClass)} ${customClass}`}>
      {children}
    </div>
  );
}

export default ButtonContainer;
