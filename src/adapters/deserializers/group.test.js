import { deserializeGroup } from './group';

describe('Deserializers > group', function () {
  it('deserializers correctly', function () {
    const result = deserializeGroup(
      {
        debutYear: 2000,
        disbandmentYear: 2001,
        id: 'g456',
        key: 'group::g123',
        membersIds: ['m1', 'm2'],
        activeYears: 2,
        name: 'group name',
        type: 'group',
      },
      'g123'
    );

    expect(result).toEqual({
      debutYear: 2000,
      disbandmentYear: 2001,
      id: 'g123',
      membersIds: ['m1', 'm2'],
      name: 'group name',
      type: 'group',
    });
  });
});
