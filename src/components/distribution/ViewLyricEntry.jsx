import React from 'react';
import PropTypes from 'prop-types';

// Components
import Avatar from '../Avatar';

function LyricEntry({ lyric, number }) {
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

LyricEntry.propTypes = {
  lyric: PropTypes.object,
  number: PropTypes.number,
};

export default LyricEntry;
