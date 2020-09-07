import React from 'react';

// Components
import SVG from './svg';

function Character() {
  return (
    <div className="character">
      <SVG.Grid />
      <SVG.Base.Tail />
      <SVG.Base.Body />
      <SVG.Base.Head />
    </div>
  );
}

export default Character;
