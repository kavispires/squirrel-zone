import React from 'react';

// Design Resources
import { Card, Image } from 'antd';
// Utilities
import { IMAGE_URL } from '../utils/constants';
import { dasherize } from '../utils';

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
                  src={`${IMAGE_URL.GROUP}${dasherize(group.name)}`}
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

export default GroupsCards;
