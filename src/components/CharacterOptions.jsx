import React from 'react';

import FurColorSelector from './options/FurColorSelector';
import SnoutColorSelector from './options/SnoutColorSelector';
import NoseColorSelector from './options/NoseColorSelector';

function CharacterOptions() {
  return (
    <div className="options">
      <FurColorSelector />
      <SnoutColorSelector />
      <NoseColorSelector />
    </div>
  );
}

export default CharacterOptions;
