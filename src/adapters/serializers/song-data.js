import { serializeKey } from '../../utils';

/**
 * Serialize a song-data parsing fields to be consumed by the application.
 * @param {object} data
 * @param {string} [id]
 * @returns {object}
 */
export const serializeSongData = (data, id) => {
  const serializedSongData = {
    id: id ?? data.id,
    type: data.type,
    key: serializeKey(data.type, id ?? data.id),

    sectionsIds: data.sectionsIds ? JSON.parse(data.sectionsIds) : [],
  };

  const included = data.included ? JSON.parse(data.included) : [];
  serializedSongData.included = included.reduce(
    (acc, entry) => {
      switch (entry.type) {
        case 'section':
          acc.sections[entry.id] = entry;
          break;
        case 'line':
          acc.lines[entry.id] = entry;
          break;
        case 'part':
          acc.parts[entry.id] = entry;
          break;
        default:
          console.warn('Included data contains an invalid type', entry);
      }
      return acc;
    },
    {
      sections: {},
      lines: {},
      parts: {},
    }
  );

  serializedSongData.partsIds = Object.values(serializedSongData.included.parts)
    .sort((a, b) => a.startTime < b.endTime)
    .map((entry) => entry.id);

  return serializedSongData;
};
