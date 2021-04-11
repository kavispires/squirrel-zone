import React from 'react';

// Components
// import useCharacterState from '../../states/useCharacterState';
import { getRandomAppearanceId, getRandomColor } from '../../utils/maker/appearance';
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
    mainColor: getRandomColor(),
    tailId: getRandomAppearanceId('SHAPE', 'TAIL'),
    furId: getRandomAppearanceId('COLOR', 'FUR'),
    snoutId: getRandomAppearanceId('COLOR', 'SNOUT'),
    noseId: getRandomAppearanceId('COLOR', 'NOSE'),
    eyeColorId: getRandomAppearanceId('COLOR', 'EYE'),
    eyeLidsId: getRandomAppearanceId('SHAPE', 'EYE_LID'),
    mouthId: getRandomAppearanceId('SHAPE', 'MOUTH'),
    underwearId: getRandomAppearanceId('ACCESSORY', 'UNDERWEAR'),
    eyeVariationId: getRandomAppearanceId('FEATURE', 'EYE_VARIATION'),
    faceVariationId: getRandomAppearanceId('FEATURE', 'FACE_VARIATION'),
  };

  return (
    <div className="character">
      <Grid />
      <SVG onGrid data={data} />
    </div>
  );
}

export default Character;
