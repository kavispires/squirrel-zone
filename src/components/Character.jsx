import React from 'react';

// Components
import SVG from './svg';

import useCharacterState from '../states/useCharacterState';

function Character() {
  const [furColor] = useCharacterState('furColor');
  console.log({ furColor });
  return (
    <div className="character">
      <SVG.Grid />
      <SVG.Base.Tail furColor={furColor} />
      <SVG.Base.Body furColor={furColor} />
      <SVG.Base.Head furColor={furColor} />
    </div>
  );
}

export default Character;
