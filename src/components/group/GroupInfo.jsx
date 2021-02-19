import React from 'react';

function GroupInfo({ group }) {
  return (
    <div>
      <p>Years Active: {group.disbandmentYear - group.debutYear + 1}</p>
      <p>Debut Year: {group.debutYear}</p>
      <p>Disbandment Year: {group.disbandmentYear}</p>
      <p>Number of Members: {group.membersIds.length}</p>
    </div>
  );
}

export default GroupInfo;
