import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// State
import useDistributorState from '../../states/useDistributorState';
// Utils
import { bemClass, getBemModifier } from '../../utils';
// Components
import ViewLyricEntry from './ViewLyricEntry';

const getClosesTime = (currentTime, lyrics) => {
  let closestIndex = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].startTime > currentTime * 100) {
      break;
    }
    closestIndex = i;
  }

  return closestIndex;
};

function ViewLyricsScroller({ currentTime, lyrics, dimensions }) {
  const lyricsRef = useRef([]);
  const [latestIndex, setLatestIndex] = useState(0);
  const [isPlaying] = useDistributorState('isPlaying');

  // Center song title from the start
  useEffect(() => {
    lyricsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  // In case of play head change or video paused and played
  useEffect(() => {
    if (isPlaying) {
      if (currentTime * 1000 < lyrics[1].startTime) {
        lyricsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        setLatestIndex(0);
      } else {
        const closestIndex = getClosesTime(currentTime, lyrics);
        setLatestIndex(closestIndex);
        lyricsRef.current[closestIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isPlaying]); // eslint-disable-line

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
          const paddingClass = getBemModifier(index > latestIndex && !lyric.title, 'padded');

          return (
            <li
              key={`lyrics-${index}`}
              ref={(el) => (lyricsRef.current[index] = el)}
              className={bemClass('lyrics-scroller__li', paddingClass)}
            >
              {Boolean(lyric.title) ? (
                <div className="lyrics-scroller__title">
                  <h1>{lyric.subtitle}</h1>
                  <h2>{lyric.title}</h2>
                </div>
              ) : (
                <ViewLyricEntry lyric={lyric} number={index} dimensions={dimensions} />
              )}
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

export default memo(ViewLyricsScroller);
