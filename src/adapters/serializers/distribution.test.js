import { serializeDistribution } from './distribution';

describe('Serializers > distribution', function () {
  const distributionRequiredFields = {
    id: 'd123',
    type: 'distribution',
    name: 'distribution name',
    songId: 's123',
    songTitle: 'song title',
    groupId: 'g123',
  };

  it('serializers correctly', function () {
    const result = serializeDistribution({
      ...distributionRequiredFields,
      stats: '{"m1": 100}',
    });

    expect(result).toEqual({
      groupId: 'g123',
      id: 'd123',
      key: 'distribution::d123',
      name: 'distribution name',
      songId: 's123',
      songTitle: 'song title',
      stats: { m1: 100 },
      type: 'distribution',
    });
  });

  it('serializers partial data correctly', function () {
    const result = serializeDistribution({
      ...distributionRequiredFields,
    });

    expect(result).toEqual({
      groupId: 'g123',
      id: 'd123',
      key: 'distribution::d123',
      name: 'distribution name',
      songId: 's123',
      songTitle: 'song title',
      stats: {},
      type: 'distribution',
    });
  });
});
