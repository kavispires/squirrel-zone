import React from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Button, Divider, Progress, Select } from 'antd';
// Utilities
import { DISTRIBUTION_NAME } from '../../utils/constants';

function EditDistributeOptions({
  assignedParts,
  parts,
  resetDistribution,
  isLoading,
  updateName,
  saveDistribution,
  activeDistribution,
  distributionName,
}) {
  const distributionCompletion = Math.floor(
    (100 * Object.keys(assignedParts ?? {}).length) / Object.keys(parts ?? {}).length
  );

  return (
    <div className="distribute-options">
      <Divider />
      <Progress percent={distributionCompletion} className="distribute-options__completion" />
      <div className="distribute-options__controls">
        <Button type="default" danger onClick={resetDistribution} disabled={isLoading}>
          Reset Distribution
        </Button>
        <Button type="default" disabled>
          Magic Distribution
        </Button>
        <Select
          defaultValue={distributionName}
          onChange={updateName}
          disabled={isLoading}
          className="distribute-options__actions-input"
        >
          {Object.entries(DISTRIBUTION_NAME).map(([distValue, distText]) => (
            <Select.Option key={distValue} value={distValue}>
              {distText}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={saveDistribution}
          disabled={isLoading || distributionCompletion < 100}
        >
          {activeDistribution?.id ? 'Update' : 'Save'} Distribution
        </Button>
      </div>
    </div>
  );
}

EditDistributeOptions.propTypes = {
  activeDistribution: PropTypes.object,
  assignedParts: PropTypes.object,
  distributionName: PropTypes.string,
  isLoading: PropTypes.bool,
  parts: PropTypes.object,
  resetDistribution: PropTypes.func,
  saveDistribution: PropTypes.func,
  updateName: PropTypes.func,
};

export default EditDistributeOptions;
