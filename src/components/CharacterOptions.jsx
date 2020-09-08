import React from 'react';

import FurColorSelector from './options/FurColorSelector';
import SnoutColorSelector from './options/SnoutColorSelector';

function CharacterOptions() {
  return (
    <div className="options">
      <FurColorSelector />
      <SnoutColorSelector />
    </div>
  );
}

export default CharacterOptions;
