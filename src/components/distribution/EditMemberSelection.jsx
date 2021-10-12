import React from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Button } from 'antd';
import { bemClassConditionalModifier } from '../../utils';
// Components
import Member from '../Member';

function EditMemberSelection({ member, selectedMember, toggleMember, progress = 0, count = 0 }) {
  return (
    <Button
      key={`button-${member.id}`}
      type="text"
      className={bemClassConditionalModifier('member-selection', 'selected', selectedMember === member.key)}
      onClick={() => toggleMember(member.key)}
    >
      <Member
        member={member}
        showName
        showPosition
        isSelected
        progress={progress}
        count={count}
        className="member-selection__component"
        showProgressNumber
      />
    </Button>
  );
}

EditMemberSelection.propTypes = {
  count: PropTypes.number,
  member: PropTypes.object,
  progress: PropTypes.number,
  selectedMember: PropTypes.string,
  toggleMember: PropTypes.func,
};

EditMemberSelection.defaultProps = {
  count: 0,
  progress: 0,
};

export default EditMemberSelection;
