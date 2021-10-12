/**
 * Deserialize a group preparing fields to be saved to the database.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const deserializeGroup = (data, id) => {
  return {
    id: id ?? data.id,
    type: 'group',
    debutYear: data.debutYear || null,
    disbandmentYear: data.disbandmentYear || null,
    membersIds: data.membersIds ?? [],
    name: data.name,
  };
};
