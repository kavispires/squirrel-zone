import { serializeKey } from '../../utils/distributor';

/**
 * Serialize a distribution parsing fields to be consumed by the application.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const serializeDistribution = (data, id) => {
  return {
    id: id ?? data.id,
    type: data.type,
    key: serializeKey(data.type, id ?? data.id),

    name: data.name,
    songId: data.songId,
    songTitle: data.songTitle,
    groupId: data.groupId,
    stats: data.stats ? JSON.parse(data.stats) : {},
  };
};
