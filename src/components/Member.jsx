import React, { Fragment } from 'react';

// Design Resources
import { Badge, Tag, Tooltip } from 'antd';

// Components
import Avatar from './Avatar';

function Member({
  member,
  className = '',
  showName = false,
  showPosition = false,
  progress,
  count,
  showProgressNumber = false,
}) {
  return (
    <li className={`member ${className}`}>
      <Badge count={count}>
        <Avatar
          name={member.name}
          className="member-avatar"
          style={{ borderColor: member.color ?? 'black' }}
        />
      </Badge>
      <span className="member-info">
        {showName && <span className="member-name">{member.name}</span>}
        {showPosition && <span className="member__separator">•</span>}
        {showPosition && (
          <span className="member-position">
            <Tag>{member.positions[0]}</Tag>
          </span>
        )}
      </span>
      {progress !== undefined && progress !== null && (
        <Fragment>
          <Tooltip title={`${progress}%`}>
            <span className="member-progress">
              <span
                className="member-progress-bar"
                style={{ width: `${progress}%`, backgroundColor: member.color ?? 'white' }}
              ></span>
            </span>
          </Tooltip>
          {showProgressNumber && <span className="member-progress-number">{progress || 0}%</span>}
        </Fragment>
      )}
    </li>
  );
}

export default Member;
