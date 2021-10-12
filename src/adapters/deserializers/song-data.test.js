import { deserializeSongData } from './song-data';

describe('Deserializers > song-data', function () {
  it('deserializers correctly', function () {
    const result = deserializeSongData(
      {
        id: 'sd456',
        included: [
          { id: 'se1', type: 'section' },
          { id: 'pa1', type: 'part' },
        ],
        key: 'song-data::sd456',
        sectionsIds: ['s1', 's2'],
        type: 'song-data',
      },
      'sd123'
    );

    expect(result).toEqual({
      id: 'sd123',
      included: '[{"id":"se1","type":"section","songId":"sd123"},{"id":"pa1","type":"part"}]',
      sectionsIds: '["s1","s2"]',
      type: 'song-data',
    });
  });
});
