import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Badge, Tag, Tooltip } from 'antd';
// Components
import Avatar from './Avatar';
import { humanize } from '../utils';

function Member({
  className = '',
  member,
  count,
  progress,
  showName = false,
  showPosition = false,
  showProgressNumber = false,
}) {
  return (
    <li className={`member ${className}`}>
      <Badge count={count}>
        <Avatar
          name={member.name}
          className="member__avatar"
          style={{ borderColor: member.color ?? 'black' }}
        />
      </Badge>
      <span className="member__info">
        {showName && <span className="member__name">{member.name}</span>}
        {showPosition && <span className="member__separator">•</span>}
        {showPosition && <Tag className="member__position">{humanize(member.positions[0])}</Tag>}
      </span>
      {progress !== undefined && progress !== null && (
        <Fragment>
          <Tooltip title={`${progress}%`}>
            <span className="member__progress">
              <span
                className="member__progress-bar"
                style={{ width: `${progress}%`, backgroundColor: member.color ?? 'white' }}
              ></span>
            </span>
          </Tooltip>
          {showProgressNumber && <span className="member__progress-number">{progress || 0}%</span>}
        </Fragment>
      )}
    </li>
  );
}

Member.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  member: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  progress: PropTypes.number,
  showName: PropTypes.bool,
  showPosition: PropTypes.bool,
  showProgressNumber: PropTypes.bool,
};

Member.defaultProps = {
  className: '',
  progress: 0,
  showName: false,
  showPosition: false,
  showProgressNumber: false,
};

export default Member;
