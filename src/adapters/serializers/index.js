// Serializers
import { serializeDistribution } from './distribution';
import { serializeDistributionData } from './distribution-data';
import { serializeGroup } from './group';
import { serializeMember } from './member';
import { serializeSong } from './song';
import { serializeSongData } from './song-data';
// Utils
import { DATA_TYPE } from '../../utils/constants';
import { serializeKey } from '../../utils/distributor';

/**
 * Triage the data to the appropriate serializer based on its type
 * @param {object} data
 * @param {string} id
 * @returns {object}
 */
const serialize = (data, id) => {
  switch (data.type) {
    case DATA_TYPE.DISTRIBUTION:
      return serializeDistribution(data, id);
    case DATA_TYPE.DISTRIBUTION_DATA:
      return serializeDistributionData(data, id);
    case DATA_TYPE.GROUP:
      return serializeGroup(data, id);
    case DATA_TYPE.MEMBER:
      return serializeMember(data, id);
    case DATA_TYPE.SONG:
      return serializeSong(data, id);
    case DATA_TYPE.SONG_DATA:
      return serializeSongData(data, id);
    default:
      console.warn(`No serializer was setup for ${data.type}`);
      return { ...data, key: serializeKey(data.type, id ?? data.id) };
  }
};

export default serialize;
