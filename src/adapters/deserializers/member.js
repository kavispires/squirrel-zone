import { sortPositions } from '../../utils';

/**
 * Deserialize a member preparing fields to be saved to the database.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const deserializeMember = (data, id) => {
  return {
    id: id ?? data.id,
    type: 'member',
    age: data.age,
    color: data.color,
    isContestant: data.isContestant,
    name: data.name,
    positions: sortPositions(data.positions),
    tagline: data.tagline,
  };
};
