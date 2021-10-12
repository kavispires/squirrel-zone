import { serializeDistributionData } from './distribution-data';

describe('Serializers > distribution-data', function () {
  const distributionDataRequiredFields = {
    id: 'dd123',
    type: 'distribution-data',
    groupId: 'g123',
  };

  it('serializers correctly', function () {
    const result = serializeDistributionData({
      ...distributionDataRequiredFields,
      assignedParts: '{"p1": "m1"}',
    });

    expect(result).toEqual({
      assignedParts: { p1: 'm1' },
      groupId: 'g123',
      id: 'dd123',
      key: 'distribution-data::dd123',
      type: 'distribution-data',
    });
  });

  it('serializers partial data correctly', function () {
    const result = serializeDistributionData({
      ...distributionDataRequiredFields,
    });

    expect(result).toEqual({
      assignedParts: {},
      groupId: 'g123',
      id: 'dd123',
      key: 'distribution-data::dd123',
      type: 'distribution-data',
    });
  });
});
