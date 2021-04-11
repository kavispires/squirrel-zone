import React from 'react';

// Components
// import useCharacterState from '../../states/useCharacterState';
import { getRandomAppearanceId } from '../../utils/maker/appearance';
import Grid from './Grid';
import SVG from './SVG';

function Character() {
  // const [furColor] = useCharacterState('furColor');
  // const [snoutColor] = useCharacterState('snoutColor');
  // const [noseColor] = useCharacterState('noseColor');
  // const [eyeColor] = useCharacterState('eyeColor');

  // const data = {
  //   furColor,
  //   snoutColor,
  //   noseColor,
  //   eyeColor,
  // };

  const data = {
    tailId: getRandomAppearanceId('SHAPE', 'TAIL'),
    furId: getRandomAppearanceId('COLOR', 'FUR'),
    snoutId: getRandomAppearanceId('COLOR', 'SNOUT'),
    noseId: getRandomAppearanceId('COLOR', 'NOSE'),
    eyeColorId: getRandomAppearanceId('COLOR', 'EYE'),
    eyeLidsId: getRandomAppearanceId('SHAPE', 'EYE_LID'),
  };

  return (
    <div className="character">
      <Grid />
      <SVG onGrid data={data} />
    </div>
  );
}

export default Character;
