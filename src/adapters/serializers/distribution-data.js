import { serializeKey } from '../../utils';

/**
 * Serialize a distribution data parsing fields to be consumed by the application.
 * @param {object} data
 * @param {string} [id_]
 * @returns {object}
 */
export const serializeDistributionData = (data, id) => {
  return {
    id: id ?? data.id,
    type: data.type,
    key: serializeKey(data.type, id ?? data.id),

    groupId: data.groupId,
    assignedParts: data.assignedParts ? JSON.parse(data.assignedParts) : {},
  };
};
