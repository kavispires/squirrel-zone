import { serializeSongData } from './song-data';

describe('Serializers > song-data', function () {
  const songDataRequiredFields = {
    id: 'sd123',
    type: 'song-data',
  };

  it('serializers correctly', function () {
    const result = serializeSongData({
      ...songDataRequiredFields,
      sectionsIds: `["s1", "s2"]`,
      included: `[{"id":"a","type":"part","startTime":3},{"id":"b","type":"part","startTime":1},{"id":"c","type":"part","startTime":2}]`,
    });

    expect(result).toEqual({
      id: 'sd123',
      included: {
        lines: {},
        parts: {
          a: { id: 'a', startTime: 3, type: 'part' },
          b: { id: 'b', startTime: 1, type: 'part' },
          c: { id: 'c', startTime: 2, type: 'part' },
        },
        sections: {},
      },
      key: 'song-data::sd123',
      partsIds: ['a', 'b', 'c'],
      sectionsIds: ['s1', 's2'],
      type: 'song-data',
    });
  });

  it('serializers partial data correctly', function () {
    const result = serializeSongData({
      ...songDataRequiredFields,
    });

    expect(result).toEqual({
      id: 'sd123',
      included: { lines: {}, parts: {}, sections: {} },
      key: 'song-data::sd123',
      partsIds: [],
      sectionsIds: [],
      type: 'song-data',
    });
  });
});
