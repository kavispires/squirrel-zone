import { injectSongIdToSections } from '../utils';
import { POSITIONS_WEIGHT } from '../utils/constants';
import { cleanupObject } from '../utils/distributor';

const deserialize = (data, id) => {
  const cleanData = cleanupObject(data);

  switch (data.type) {
    case 'group':
      return deserializer.group(cleanData, id);
    case 'member':
      return deserializer.member(cleanData, id);
    case 'song':
      return deserializer.song(cleanData, id);
    case 'song-data':
      return deserializer.songData(cleanData, id);
    default:
      return { ...data, id: id ?? data.id };
  }
};

const deserializer = {
  group: (data, id) => {
    return {
      ...data,
      id: id ?? data.id,
    };
  },
  member: (data, id) => {
    return {
      ...data,
      id: id ?? data.id,
      positions: data.positions.sort((a, b) => POSITIONS_WEIGHT[b] - POSITIONS_WEIGHT[a]),
    };
  },
  song: (data, id) => {
    return {
      ...data,
      id: id ?? data.id,
    };
  },

  songData: (data, id) => {
    return {
      ...data,
      id: id ?? data.id,
      sectionsIds: JSON.stringify(data.sectionsIds),
      // Inject songId to included sections songId
      included: JSON.stringify(injectSongIdToSections(data.included, id ?? data.id)),
    };
  },
};

export default deserialize;
