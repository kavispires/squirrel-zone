import { deserializeDistribution } from './distribution';

describe('Deserializers > distribution', function () {
  it('deserializers correctly', function () {
    const result = deserializeDistribution(
      {
        id: 'd456',
        groupId: 'g123',
        key: 'distribution::d123',
        name: 'distribution name',
        songId: 's123',
        songTitle: 'song title',
        stats: { m1: 100 },
        type: 'distribution',
        assignedParts: '{"p1": "m1"}',
      },
      'd123'
    );

    expect(result).toEqual({
      data: {
        assignedParts: '"{\\"p1\\": \\"m1\\"}"',
        groupId: 'g123',
        id: 'd123',
        type: 'distribution-data',
      },
      distribution: {
        groupId: 'g123',
        id: 'd123',
        name: 'distribution name',
        songId: 's123',
        songTitle: 'song title',
        stats: '{"m1":100}',
        type: 'distribution',
      },
    });
  });
});
