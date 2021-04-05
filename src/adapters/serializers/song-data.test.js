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
      included: `{"s1": true}`,
    });

    expect(result).toEqual({
      id: 'sd123',
      included: { s1: true },
      key: 'song-data::sd123',
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
      included: [],
      key: 'song-data::sd123',
      sectionsIds: [],
      type: 'song-data',
    });
  });
});
