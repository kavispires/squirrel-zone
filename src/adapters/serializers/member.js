import { parseColor, serializeKey } from '../../utils';

/**
 * Serialize a member parsing fields to be consumed by the application.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const serializeMember = (data, id) => {
  return {
    id: id ?? data.id,
    type: data.type,
    key: serializeKey(data.type, id ?? data.id),

    name: data.name,
    age: data.age,
    color: data.color ? parseColor(data.color) : '',
    colorName: data.colorName ?? '',
    codename: data.codename ?? '',
    tagline: data.tagline ?? '',
    isContestant: Boolean(data.isContestant),
    positions: data.positions ?? [],
  };
};
