import React from 'react';

// Components
import SVG from './svg';

import useCharacterState from '../states/useCharacterState';

function Character() {
  const [furColor] = useCharacterState('furColor');
  const [snoutColor] = useCharacterState('snoutColor');
  const [noseColor] = useCharacterState('noseColor');

  return (
    <div className="character">
      <SVG.Grid />
      <SVG.Base.Tail furColor={furColor} />
      <SVG.Base.Body furColor={furColor} />
      <SVG.Base.Head furColor={furColor} snoutColor={snoutColor} noseColor={noseColor} />
    </div>
  );
}

export default Character;
