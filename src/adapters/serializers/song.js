import { serializeKey } from '../../utils/distributor';

/**
 * Serialize a song parsing fields to be consumed by the application.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const serializeSong = (data, id) => {
  const serializedSong = {
    id: id ?? data.id,
    type: data.type,
    key: serializeKey(data.type, id ?? data.id),

    albumId: data.albumId ?? 'N/A',
    completion: data.completion ?? 0,
    createdAt: data.createdAt,
    duration: data.duration ?? '00:00',
    genre: data.genre ?? 'UNKNOWN',
    idealGroupSize: data.idealGroupSize ?? 5,
    isComplete: Boolean(data.isComplete),
    isSingle: Boolean(data.isSingle),
    scale: data.scale ?? 'UNKNOWN',
    style: data.style ?? '',
    tempo: data.tempo ?? 0,
    title: data.title ?? '[Untitled]',
    version: data.version ?? '',
    videoId: data.videoId,
    updatedAt: data.updatedAt,
  };

  // Additional Fields
  serializedSong.fullTitle = serializedSong.version
    ? `${serializedSong.title} (${serializedSong.version})`
    : serializedSong.title;

  return serializedSong;
};
