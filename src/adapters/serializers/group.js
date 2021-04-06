import { serializeKey } from '../../utils';

/**
 * Serialize a group parsing fields to be consumed by the application.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const serializeGroup = (data, id) => {
  const serializedGroup = {
    id: id ?? data.id,
    type: data.type,
    key: serializeKey(data.type, id ?? data.id),

    name: data.name,
    debutYear: data.debutYear ?? 0,
    disbandmentYear: data.disbandmentYear ?? 0,
    membersIds: data.membersIds ?? [],
  };
  // Additional fields
  serializedGroup.activeYears = serializedGroup.disbandmentYear - serializedGroup.debutYear + 1;

  return serializedGroup;
};
