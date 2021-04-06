// Deserializers
import { deserializeDistribution } from './distribution';
import { deserializeGroup } from './group';
import { deserializeMember } from './member';
import { deserializeSong } from './song';
import { deserializeSongData } from './song-data';
// Utils
import { DATA_TYPE } from '../../utils/constants';
import { cleanupObject } from '../../utils';

/**
 * Triage the data to the appropriate deserializer based on its type
 * @param {object} data
 * @param {string} id
 * @returns {object}
 */
const deserialize = (data, id) => {
  const cleanData = cleanupObject(data);

  switch (data.type) {
    case DATA_TYPE.DISTRIBUTION:
      return deserializeDistribution(data, id);
    case DATA_TYPE.GROUP:
      return deserializeGroup(cleanData, id);
    case DATA_TYPE.MEMBER:
      return deserializeMember(cleanData, id);
    case DATA_TYPE.SONG:
      return deserializeSong(cleanData, id);
    case DATA_TYPE.SONG_DATA:
      return deserializeSongData(cleanData, id);
    default:
      console.warn(`No deserializer was setup for ${data.type}`);
      return { ...data, id: id ?? data.id };
  }
};

export default deserialize;
