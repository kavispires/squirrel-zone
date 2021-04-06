import React from 'react';
import PropTypes from 'prop-types';

function GroupCardActions(group, goToGroupPage) {
  return [
    <span className="group-cards__card-action" onClick={(e) => goToGroupPage(e, group, 'members')}>
      Members
    </span>,
    <span className="group-cards__card-action" onClick={(e) => goToGroupPage(e, group, 'distributions')}>
      Distributions
    </span>,
  ];
}

GroupCardActions.propTypes = {
  group: PropTypes.object,
  goToGroupPage: PropTypes.func,
};

export default GroupCardActions;
