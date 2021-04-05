import { cleanupStats } from '../../utils';

/**
 * Deserialize a distribution preparing fields to be saved to the database.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const deserializeDistribution = (data, id) => {
  return {
    distribution: {
      id: id ?? data.id,
      type: 'distribution',
      name: data.name,
      songId: data.songId,
      songTitle: data.songTitle,
      groupId: data.groupId,
      stats: JSON.stringify(cleanupStats(data.stats)),
    },
    data: {
      id: id ?? data.id,
      type: 'distribution-data',
      groupId: data.groupId,
      assignedParts: JSON.stringify(data.assignedParts),
    },
  };
};
