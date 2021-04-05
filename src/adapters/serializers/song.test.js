import { serializeSong } from './song';

describe('Serializers > song', function () {
  const songRequiredFields = {
    id: 's123',
    type: 'song',
    name: 'song name',
    createdAt: 1610869004019,
    videoId: 'v123',
    updatedAt: 1613534326094,
  };

  it('serializers correctly', function () {
    const result = serializeSong({
      ...songRequiredFields,
      albumId: 'a123',
      completion: 100,
      duration: '03:45',
      genre: 'POP',
      idealGroupSize: 4,
      isComplete: true,
      isSingle: true,
      scale: 'C Minor',
      style: 'DANCE',
      tempo: '120bpm',
      title: 'song title',
      version: 'remix',
    });

    expect(result).toEqual({
      albumId: 'a123',
      completion: 100,
      createdAt: 1610869004019,
      duration: '03:45',
      fullTitle: 'song title (remix)',
      genre: 'POP',
      id: 's123',
      idealGroupSize: 4,
      isComplete: true,
      isSingle: true,
      key: 'song::s123',
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

  it('serializers partial data correctly', function () {
    const result = serializeSong({
      ...songRequiredFields,
    });

    expect(result).toEqual({
      albumId: 'N/A',
      completion: 0,
      createdAt: 1610869004019,
      duration: '00:00',
      fullTitle: '[Untitled]',
      genre: 'UNKNOWN',
      id: 's123',
      idealGroupSize: 5,
      isComplete: false,
      isSingle: false,
      key: 'song::s123',
      scale: 'UNKNOWN',
      style: '',
      tempo: 0,
      title: '[Untitled]',
      type: 'song',
      updatedAt: 1613534326094,
      version: '',
      videoId: 'v123',
    });
  });
});
