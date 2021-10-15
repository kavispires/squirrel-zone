import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { bemClass, getBemModifier } from '../../utils';

// Components
import ViewLyricEntry from './ViewLyricEntry';

function ViewLyricsScroller({ currentTime, lyrics, dimensions }) {
  const lyricsRef = useRef([]);
  const [latestIndex, setLatestIndex] = useState(-1);

  // If the next line is gonna start within 500ms, center it
  useEffect(() => {
    if (latestIndex === lyrics.length - 1) return;

    if (currentTime > 0 && currentTime < 0.3) {
      console.log(currentTime);
      lyricsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'end' });
      setLatestIndex(-1);
      return;
    }

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
              <ViewLyricEntry lyric={lyric} number={index} dimensions={dimensions} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ViewLyricsScroller.propTypes = {
  currentTime: PropTypes.number,
  dimensions: PropTypes.object,
  lyrics: PropTypes.array,
};

export default ViewLyricsScroller;
