import { deserializeSong } from './song';

describe('Deserializers > song', function () {
  it('deserializers correctly', function () {
    const result = deserializeSong(
      {
        albumId: 'a123',
        completion: 100,
        createdAt: 1610869004019,
        duration: '03:45',
        fullTitle: 'song title (remix)',
        genre: 'POP',
        id: 's456',
        idealGroupSize: 4,
        isComplete: true,
        isSingle: true,
        key: 'song::s456',
        scale: 'C Minor',
        style: 'DANCE',
        tempo: '120bpm',
        title: 'song title',
        type: 'song',
        updatedAt: 1613534326094,
        version: 'remix',
        videoId: 'v123',
      },
      's123'
    );

    expect(result).toEqual({
      albumId: 'a123',
      completion: 100,
      createdAt: 1610869004019,
      duration: '03:45',
      genre: 'POP',
      id: 's123',
      idealGroupSize: 4,
      isComplete: true,
      isSingle: true,
      scale: 'C Minor',
      style: 'DANCE',
      tempo: '120bpm',
      title: 'song title',
      type: 'song',
      updatedAt: 1613534326094,
      version: 'remix',
      videoId: 'v123',
    });
  });
});
