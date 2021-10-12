import React from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Card, Image } from 'antd';
// Utilities
import { IMAGE_URL } from '../../utils/constants';
import { dasherize } from '../../utils';
import GroupCardActions from './GroupCardActions';

function GroupsCards({ groups, goToGroupPage }) {
  return (
    <ul className="groups-cards">
      {groups.map((group) => {
        return (
          <li key={group.id} className="groups-cards__item">
            <Card
              hoverable
              cover={
                <Image
                  alt={group.name}
                  src={`${IMAGE_URL.GROUP}${dasherize(group.name)}.jpg`}
                  fallback={`${IMAGE_URL.GROUP}no-group-photo.jpg`}
                />
              }
              actions={GroupCardActions(group, goToGroupPage)}
              className="groups-cards__card"
              onClick={(e) => goToGroupPage(e, group)}
            >
              <Card.Meta title={group.name} description={`${group.debutYear} — ${group.disbandmentYear}`} />
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

GroupsCards.propTypes = {
  groups: PropTypes.array,
  goToGroupPage: PropTypes.func,
};

export default GroupsCards;
