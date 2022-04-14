import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { bemClass, getBemModifier } from '../../utils';

// Components
import Avatar from '../Avatar';

function ViewRankEntry({ member, rank, dimensions }) {
  const onClass = getBemModifier(rank.on, 'on');

  return (
    <li className={bemClass('rank-entry', onClass, rank.position)}>
      <Avatar
        name={member.name}
        className="rank-entry__avatar"
        color={member.color ?? 'black'}
        size={dimensions.avatar.size}
        borderSize={dimensions.avatar.border}
      />
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

ViewRankEntry.propTypes = {
  dimensions: PropTypes.shape({
    avatar: PropTypes.shape({
      border: PropTypes.number,
      size: PropTypes.number,
    }),
  }),
  member: PropTypes.object,
  rank: PropTypes.object,
};

export default ViewRankEntry;
