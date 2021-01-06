import { serializeKey } from '../utils/distributor';

const serialize = (data, id) => {
  switch (data.type) {
    case 'song':
      return serializer.song(data, id);
    case 'song-data':
      return serializer.songData(data, id);
    default:
      return { ...data, key: serializeKey(data.type, id ?? data.id) };
  }
};

const serializer = {
  song: (data, id) => {
    return {
      id: id ?? data.id,
      type: data.type,
      key: serializeKey(data.type, id ?? data.id),
      albumId: data.albumId ?? 'N/A',
      completion: data.completion,
      createdAt: data.createdAt,
      duration: '00:00',
      genre: data.genre ?? '',
      idealGroupSize: data.idealGroupSize ?? 5,
      isComplete: data.isComplete,
      isSingle: Boolean(data.isSingle),
      style: data.style ?? '',
      tempo: data.tempo ?? 0,
      title: data.title ?? 'Untitled',
      version: data.version ?? '',
      videoId: data.videoId,
      updatedAt: data.updatedAt,
    };
  },

  songData: (data, id) => {
    return {
      id: id ?? data.id,
      type: data.type,
      key: serializeKey(data.type, id ?? data.id),
      sectionsIds: JSON.parse(data.sectionsIds ?? '') ?? [],
      included: JSON.parse(data.included ?? '') ?? [],
    };
  },
};

export default serialize;
