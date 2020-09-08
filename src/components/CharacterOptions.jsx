import React from 'react';

import FurColorSelector from './options/FurColorSelector';
import SnoutColorSelector from './options/SnoutColorSelector';
import NoseColorSelector from './options/NoseColorSelector';
import EyeColorSelector from './options/EyeColorSelector';

function CharacterOptions() {
  return (
    <div className="options">
      <FurColorSelector />
      <SnoutColorSelector />
      <NoseColorSelector />
      <EyeColorSelector />
    </div>
  );
}

export default CharacterOptions;
