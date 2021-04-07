import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { bemClass, getBemModifier } from '../../utils';

// Components
import LyricEntry from './LyricEntry';

function LyricsScroller({ currentTime, lyrics }) {
  const lyricsRef = useRef([]);
  const [latestIndex, setLatestIndex] = useState(-1);

  // If the next line is gonna start within 500ms, center it
  useEffect(() => {
    if (latestIndex === lyrics.length - 1) return;

    if (lyrics[latestIndex + 1].startTime <= Math.trunc(currentTime * 1000) + 100) {
      lyricsRef.current[latestIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      setLatestIndex(latestIndex + 1);
    }
  }, [currentTime, lyrics, lyricsRef, latestIndex]);

  return (
    <div className="line-distribution__live-lyrics lyrics-scroller">
      <ul className="lyrics-scroller__entries-container">
        {lyrics.map((lyric, index) => {
          const paddingClass = getBemModifier(index > latestIndex, 'padded');
          return (
            <li
              key={`lyrics-${index}`}
              ref={(el) => (lyricsRef.current[index] = el)}
              className={bemClass('lyrics-scroller__li', paddingClass)}
            >
              <LyricEntry lyric={lyric} number={index} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

LyricsScroller.propTypes = {
  currentTime: PropTypes.number,
  lyrics: PropTypes.array,
};

export default LyricsScroller;
