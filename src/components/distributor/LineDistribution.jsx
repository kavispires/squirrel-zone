import React, { useEffect, useRef, useState } from 'react';

// Components
import YoutubeVideo from './YoutubeVideo';
import { bemClass, getBemModifier, getFrameFromTimestamp } from '../../utils';
import Avatar from '../Avatar';

function LineDistribution({ playerRef, members, bars, lyrics, framerate = 30 }) {
  const [intervalId, setIntervalId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRank, setCurrentRank] = useState(bars[0]);

  useEffect(() => {
    setCurrentRank(bars[0]);
  }, [bars]);

  const onStateChange = (e) => {
    if (e.data === 1) {
      setIntervalId(
        setInterval(() => {
          setCurrentTime(e.target.getCurrentTime());
        }, 1000 / framerate)
      );
    } else {
      // Kill interval
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    // Every time change update current ranking if id exists according to framerate
    const frameIndex = getFrameFromTimestamp(currentTime * 1000, framerate);
    if (currentTime < 0.5 || !currentRank) {
      setCurrentRank(bars[0]);
    }

    if (bars[frameIndex]) {
      setCurrentRank(bars[frameIndex]);
    }
  }, [currentRank, currentTime, bars, framerate]);

  return (
    <section className="line-distribution__container">
      <YoutubeVideo
        playerRef={playerRef}
        width="320"
        height="180"
        className="line-distribution__video"
        onStateChange={onStateChange}
      />
      <RankingBars members={members} currentRank={currentRank} />
      <LyricsScroller currentTime={currentTime} lyrics={lyrics} />
    </section>
  );
}

function RankingBars({ members, currentRank }) {
  return (
    <ul className="line-distribution__live-ranking">
      {members?.map((member) => (
        <RankEntry key={`rank-entry-${member.key}`} member={member} rank={currentRank[member.key]} />
      ))}
    </ul>
  );
}

function RankEntry({ member, rank }) {
  const onClass = getBemModifier(rank.on, 'on');

  return (
    <li className={bemClass('rank-entry', onClass, rank.position)}>
      <Avatar name={member.name} className="rank-entry__avatar" color={member.color ?? 'black'} />
      <div className="rank-entry__name">{member.name}</div>
      <div className="rank-entry__progress">
        <span
          className="rank-entry__progress-bar"
          style={{ width: `${rank.percentage}%`, backgroundColor: rank.on ? member.color : 'white' }}
        />
      </div>
      <div className="rank-entry__timestamp">{rank.value}s</div>
    </li>
  );
}

function LyricsScroller({ currentTime, lyrics }) {
  const lyricsRef = useRef([]);
  const [latestIndex, setLatestIndex] = useState(-1);

  // If the next line is gonna start within 500ms, center it
  useEffect(() => {
    if (lyrics[latestIndex + 1].startTime <= Math.trunc(currentTime * 1000) + 100) {
      lyricsRef.current[latestIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      setLatestIndex(latestIndex + 1);
    }
  }, [currentTime, lyrics, lyricsRef, latestIndex]);

  return (
    <div className="line-distribution__live-lyrics">
      <ul className="lyrics-entries-container">
        {lyrics.map((lyric, index) => {
          const paddingClass = getBemModifier(index > latestIndex, 'padded');
          return (
            <li
              key={`lyrics-${index}`}
              ref={(el) => (lyricsRef.current[index] = el)}
              className={bemClass('lyrics-entries-li', paddingClass)}
            >
              <Lyric lyric={lyric} number={index} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Lyric({ lyric, number }) {
  return (
    <div className="lyrics-entry">
      <div className="lyrics-entry__avatars">
        {lyric.names.map((name, index) => (
          <Avatar
            key={`avt-${name}-${number}-${index}`}
            name={name}
            color={lyric.colors[index]}
            className={name === 'ALL' && lyric.names.length > 1 && 'lyrics-entry__avatar--all'}
            size={name === 'ALL' && lyric.names.length > 1 && 'small'}
          />
        ))}
      </div>
      <div className="lyrics-entry__names">
        {lyric.names.map((name, index) => (
          <span
            key={`nms-${name}-${number}-${index}`}
            className="lyrics-entry__name"
            style={{ color: lyric.colors[index] }}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="lyrics-entry__lines">
        {lyric.lines.map((line, index) => (
          <span key={`lin-${line}-${number}-${index}`} className="lyrics-entry__line">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LineDistribution;
