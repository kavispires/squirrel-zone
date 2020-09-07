import React from 'react';

export function Grid() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      viewBox="0 0 1024 1024"
      className="svg-sprite"
    >
      <g>
        <g id="grid-base">
          <path
            d="M3 3h1018v1018H3zM3 957.4h1018M3 893.8h1018M3 830.1h1018M3 766.5h1018M3 702.9h1018M3 639.3h1018M3 575.6h1018M3 512h1018M3 448.4h1018M3 384.7h1018M3 321.1h1018M3 257.5h1018M3 193.9h1018M3 130.2h1018M3 66.6h1018M957.4 3v1018M893.8 3v1018M830.1 3v1018M766.5 3v1018M702.9 3v1018M639.3 3v1018M575.6 3v1018M512 3v1018M448.4 3v1018M384.7 3v1018M321.1 3v1018M257.5 3v1018M193.9 3v1018M130.2 3v1018M66.6 3v1018"
            className="svg-grid__base"
          />
        </g>
        <g id="grid-safety">
          <path d="M130.2 3h763.5v1018H130.2z" className="svg-grid__safety-lines" />
          <path
            d="M130.2 3h763.5v1018H130.2z"
            className="svg-grid__safety-lines"
            transform="rotate(90 512 512)"
          />
          <path
            d="M66.6 66.6h890.8v890.8H66.6z"
            className="svg-grid__safety-lines"
            transform="rotate(90 512 512)"
          />
        </g>
        <g id="grid-star">
          <circle cx="512" cy="512" r="509" className="svg-grid__star-lines" />
          <path
            d="M512 0v1024M1024 512H0M4.5 4.5l1015 1015M1019.5 4.5l-1015 1015"
            className="svg-grid__star-lines"
          />
        </g>
      </g>
    </svg>
  );
}

export default Grid;
