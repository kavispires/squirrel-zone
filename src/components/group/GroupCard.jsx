import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Card, Image } from 'antd';
// Components
import GroupDistributions from './GroupDistributions';
import GroupInfo from './GroupInfo';
import GroupMembers from './GroupMembers';
import { IMAGE_URL } from '../../utils/constants';
import { dasherize } from '../../utils';

function GroupCard({ tab, onTabChange, activeGroup, groupMembers, goToDistribution }) {
  const tabList = [
    {
      key: 'info',
      tab: 'Info',
    },
    {
      key: 'members',
      tab: 'Members',
    },
    {
      key: 'distributions',
      tab: 'Distributions',
    },
  ];

  return (
    <Fragment>
      <div className="group-card__cover">
        <Image
          alt={activeGroup.name}
          src={`${IMAGE_URL.GROUP}${dasherize(activeGroup.name)}--bar.jpg`}
          fallback={`${IMAGE_URL.GROUP}no-group-photo.jpg`}
          style={{ width: '100%' }}
          className="group-card__cover-image"
        />
      </div>

      <Card className="group-card" tabList={tabList} activeTabKey={tab} onTabChange={onTabChange}>
        {tab === 'info' && <GroupInfo group={activeGroup} />}
        {tab === 'members' && <GroupMembers members={groupMembers} />}
        {tab === 'distributions' && (
          <GroupDistributions
            group={activeGroup}
            members={groupMembers}
            goToDistribution={goToDistribution}
          />
        )}
      </Card>
    </Fragment>
  );
}

GroupCard.propTypes = {
  tab: PropTypes.string,
  onTabChange: PropTypes.func,
  activeGroup: PropTypes.object,
  groupMembers: PropTypes.object,
  goToDistribution: PropTypes.func,
};

GroupCard.defaultTypes = {
  tab: 'info',
};

export default GroupCard;
