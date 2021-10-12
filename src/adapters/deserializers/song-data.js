import { injectSongIdToSections } from '../../utils';

/**
 * Deserialize a song-data preparing fields to be saved to the database.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const deserializeSongData = (data, id) => {
  return {
    id: id ?? data.id,
    type: 'song-data',
    sectionsIds: JSON.stringify(data.sectionsIds),
    included: JSON.stringify(injectSongIdToSections(data.included, id ?? data.id)),
  };
};
