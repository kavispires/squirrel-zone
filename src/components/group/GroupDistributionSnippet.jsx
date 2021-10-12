import React from 'react';
import PropTypes from 'prop-types';

function GroupDistributionSnippet({ distribution, members, className = '' }) {
  return (
    <ul className={`group-distribution-snippet ${className}`}>
      {Object.entries(members).map(([memberKey, memberData]) => {
        const progress = distribution?.stats[memberKey]?.absoluteProgress ?? 0;
        return (
          <span
            key={`${distribution.id}${memberKey}`}
            style={{ width: `${progress}%`, backgroundColor: memberData.color }}
          >
            {progress > 5 ? `${progress}%` : ''}
          </span>
        );
      })}
    </ul>
  );
}

GroupDistributionSnippet.propTypes = {
  distribution: PropTypes.object,
  members: PropTypes.object,
  className: PropTypes.string,
};

GroupDistributionSnippet.defaultProps = {
  className: '',
};

export default GroupDistributionSnippet;
