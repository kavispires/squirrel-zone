import React from 'react';
import PropTypes from 'prop-types';

function GroupInfo({ group }) {
  return (
    <div>
      <p>Years Active: {group.activeYears}</p>
      <p>Debut Year: {group.debutYear}</p>
      <p>Disbandment Year: {group.disbandmentYear}</p>
      <p>Number of Members: {group.membersIds.length}</p>
    </div>
  );
}

GroupInfo.propTypes = {
  group: PropTypes.object,
};

export default GroupInfo;
