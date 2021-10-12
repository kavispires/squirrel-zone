/**
 * Deserialize a song preparing fields to be saved to the database.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const deserializeSong = (data, id) => {
  return {
    id: id ?? data.id,
    type: 'song',
    albumId: data.albumId ?? null,
    completion: data.completion ?? null,
    createdAt: data.createdAt,
    duration: data.duration ?? null,
    genre: data.genre ?? null,
    idealGroupSize: data.idealGroupSize ?? null,
    isComplete: Boolean(data.isComplete),
    isSingle: Boolean(data.isSingle),
    scale: data.scale ?? null,
    style: data.style ?? null,
    tempo: data.tempo ?? null,
    title: data.title ?? null,
    version: data.version ?? null,
    videoId: data.videoId,
    updatedAt: data.updatedAt,
  };
};
