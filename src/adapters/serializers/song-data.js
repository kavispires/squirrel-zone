import { serializeKey } from '../../utils';

/**
 * Serialize a song-data parsing fields to be consumed by the application.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const serializeSongData = (data, id) => {
  return {
    id: id ?? data.id,
    type: data.type,
    key: serializeKey(data.type, id ?? data.id),

    sectionsIds: data.sectionsIds ? JSON.parse(data.sectionsIds) : [],
    included: data.included ? JSON.parse(data.included) : [],
  };
};
