import { serializeGroup } from './group';

describe('Serializers > group', function () {
  const groupRequiredFields = {
    id: 'd123',
    type: 'group',
    name: 'group name',
  };

  it('serializers correctly', function () {
    const result = serializeGroup({
      ...groupRequiredFields,
      debutYear: 2000,
      disbandmentYear: 2001,
      membersIds: ['m1', 'm2'],
    });

    expect(result).toEqual({
      debutYear: 2000,
      disbandmentYear: 2001,
      id: 'd123',
      key: 'group::d123',
      membersIds: ['m1', 'm2'],
      activeYears: 2,
      name: 'group name',
      type: 'group',
    });
  });

  it('serializers partial data correctly', function () {
    const result = serializeGroup({
      ...groupRequiredFields,
    });

    expect(result).toEqual({
      debutYear: 0,
      disbandmentYear: 0,
      id: 'd123',
      key: 'group::d123',
      membersIds: [],
      activeYears: 1,
      name: 'group name',
      type: 'group',
    });
  });
});
