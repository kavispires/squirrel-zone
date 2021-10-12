import React from 'react';

// Design Resources
import { ApiOutlined } from '@ant-design/icons';

function LogAssignees({ partId, members, assignedParts }) {
  if (!Boolean(assignedParts?.[partId])) {
    return <ApiOutlined />;
  }

  const distributionAssignees = assignedParts?.[partId] ?? {};
  const assignedMembers = Object.keys(distributionAssignees).map((memberId) => {
    return members[memberId];
  });

  return (
    <span className="log-assignees__list">
      {assignedMembers.map((member) => {
        return (
          <span
            key={`${partId}-${member.id}`}
            className="log-assignees__item"
            style={{ backgroundColor: member?.color }}
          >
            {member?.name?.[0] ?? <ApiOutlined />}
          </span>
        );
      })}
    </span>
  );
}

export default LogAssignees;
