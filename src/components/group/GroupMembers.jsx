import React from 'react';
import PropTypes from 'prop-types';

// Components
import Member from '../Member';

function GroupMembers({ members }) {
  return (
    <ul className="group-members">
      {Object.values(members).map((member) => {
        return (
          <Member key={member.key} member={member} showName showPosition className="group-members__member" />
        );
      })}
    </ul>
  );
}

GroupMembers.propTypes = {
  members: PropTypes.object,
};

export default GroupMembers;
