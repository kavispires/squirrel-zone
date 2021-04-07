import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { bemClass, getBemModifier } from '../../utils';

// Components
import Avatar from '../Avatar';

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

RankEntry.propTypes = {
  member: PropTypes.object,
  rank: PropTypes.object,
};

export default RankEntry;
