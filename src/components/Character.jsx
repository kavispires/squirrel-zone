import React from 'react';

// Components
import SVG from './svg';

import useCharacterState from '../states/useCharacterState';

function Character() {
  const [furColor] = useCharacterState('furColor');
  const [snoutColor] = useCharacterState('snoutColor');
  const [noseColor] = useCharacterState('noseColor');
  const [eyeColor] = useCharacterState('eyeColor');

  return (
    <div className="character">
      <SVG.Grid />
      <SVG.Base.Tail furColor={furColor} />
      <SVG.Base.Body furColor={furColor} />
      <SVG.Base.Head
        furColor={furColor}
        snoutColor={snoutColor}
        noseColor={noseColor}
        eyeColor={eyeColor}
      />
    </div>
  );
}

export default Character;
