import React from 'react';
import PropTypes from 'prop-types';

// Components
import RankEntry from './RankEntry';

function RankingBars({ members, currentRank }) {
  return (
    <ul className="line-distribution__live-ranking">
      {members?.map((member) => (
        <RankEntry key={`rank-entry-${member.key}`} member={member} rank={currentRank[member.key]} />
      ))}
    </ul>
  );
}

RankingBars.propTypes = {
  members: PropTypes.array,
  currentRank: PropTypes.object,
};

export default RankingBars;
