import React from 'react';
import { bemClassConditionalModifier } from '../../utils';
import Body from './svg/Body';
import EyeLids from './svg/EyeLids';
import Eyes from './svg/Eyes';
import EyeVariation from './svg/EyeVariation';
import FaceVariation from './svg/FaceVariation';
import FacialHair from './svg/FacialHair';
import Head from './svg/Head';
import Mouth from './svg/Mouth';
import Nose from './svg/Nose';
import Tail from './svg/Tail';
import Underwear from './svg/Underwear';

function SVG({ onGrid = false, data }) {
  const onGridClass = bemClassConditionalModifier('svg-squirrel', 'on-grid', onGrid);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={onGridClass} overflow="hidden" viewBox="0 0 1024 1024">
      <defs />
      <path d="M0 0h1024v1024H0z" className="svg-squirrel__base" />
      {/* TAIL */}
      <Tail tailId={data.tailId} furId={data.furId} />
      {/* TAIL ACCESSORIES */}

      {/* BACK */}

      {/* HAIR_STYLE */}

      {/* BODY */}
      <Body furId={data.furId} />
      {/* UNDERWEAR */}
      <Underwear underwearId={data.underwearId} mainColor={data.mainColor} />
      {/* CLOTHING */}

      {/* CLOTHING_ACCESSORIES */}

      {/* HEAD */}
      <Head furId={data.furId} snoutId={data.snoutId} />
      {/* FACE_VARIATIONS */}
      <FaceVariation faceVariationId={data.faceVariationId} snoutId={data.snoutId} />
      {/* EYES_VARIATIONS */}
      <EyeVariation eyeVariationId={data.eyeVariationId} mainColor={data.mainColor} />
      {/* EYES */}
      <Eyes eyeColorId={data.eyeColorId} />
      {/* EYE_LIDS */}
      <EyeLids eyeLidsId={data.eyeLidsId} furId={data.furId} />
      {/* EYE_ACCESSORIES */}

      {/* FACIAL_HAIR */}
      <FacialHair facialHairId={'FACIAL_HAIR.BEARD.SHORT'} hairColorId={data.hairColorId} />
      {/* NOSE */}
      <Nose noseId={data.noseId} />
      {/* MOUTH */}
      <Mouth mouthId={'MOUTH.REGULAR.SMILE'} snoutId={data.snoutId} />
      {/* RINGS */}

      {/* BANGS */}

      {/* HEAD_PIECE */}
    </svg>
  );
}

export default SVG;
