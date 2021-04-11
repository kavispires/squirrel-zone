import React from 'react';
import { bemClassConditionalModifier } from '../../utils';
import Body from './svg/Body';
import EyeLids from './svg/EyeLids';
import Eyes from './svg/Eyes';
import Head from './svg/Head';
import Nose from './svg/Nose';
import Tail from './svg/Tail';

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

      {/* CLOTHING */}

      {/* CLOTHING_ACCESSORIES */}

      {/* HEAD */}
      <Head furId={data.furId} snoutId={data.snoutId} />
      {/* EYES_VARIATIONS */}

      {/* EYES */}
      <Eyes eyeColorId={data.eyeColorId} />
      {/* EYE_LIDS */}
      <EyeLids eyeLidsId={data.eyeLidsId} furId={data.furId} />
      {/* EYE_ACCESSORIES */}

      {/* FACE_VARIATIONS */}

      {/* FACIAL_HAIR */}

      {/* NOSE */}
      <Nose noseId={data.noseId} />

      {/* MOUTH */}

      {/* RINGS */}

      {/* BANGS */}

      {/* HEAD_PIECE */}
    </svg>
  );
}

export default SVG;
