import React from 'react';

// Design Resources
import { ApiOutlined } from '@ant-design/icons';
// State
import useGlobalState from '../../states/useGlobalState';

function LogAssignees({ partId }) {
  const [lineDistribution] = useGlobalState('lineDistribution');
  const [activeMembers] = useGlobalState('activeMembers');

  if (!Boolean(lineDistribution?.[partId])) {
    return <ApiOutlined />;
  }

  const distributionAssignees = lineDistribution?.[partId] ?? {};
  const assignedMembers = Object.keys(distributionAssignees).map((memberId) => {
    return activeMembers[memberId];
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
