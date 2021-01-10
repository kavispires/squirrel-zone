import { cleanupStats, injectSongIdToSections } from '../utils';
import { DATA_TYPE, POSITIONS_WEIGHT } from '../utils/constants';
import { cleanupObject } from '../utils/distributor';

const deserialize = (data, id) => {
  const cleanData = cleanupObject(data);

  switch (data.type) {
    case DATA_TYPE.DISTRIBUTION:
      return deserializer.distribution(data, id);
    case DATA_TYPE.GROUP:
      return deserializer.group(cleanData, id);
    case DATA_TYPE.MEMBER:
      return deserializer.member(cleanData, id);
    case DATA_TYPE.SONG:
      return deserializer.song(cleanData, id);
    case DATA_TYPE.SONG_DATA:
      return deserializer.songData(cleanData, id);
    default:
      return { ...data, id: id ?? data.id };
  }
};

const deserializer = {
  distribution: (data, id) => {
    return {
      distribution: {
        id: id ?? data.id,
        type: 'distribution',
        name: data.name,
        songId: data.songId,
        songTitle: data.songTitle,
        groupId: data.groupId,
        stats: JSON.stringify(cleanupStats(data.stats)),
      },
      data: {
        id: id ?? data.id,
        type: 'distribution-data',
        groupId: data.groupId,
        assignedParts: JSON.stringify(data.assignedParts),
      },
    };
  },
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
      positions: data.positions.sort((a, b) =>
        POSITIONS_WEIGHT[b] > POSITIONS_WEIGHT[a] ? -1 : POSITIONS_WEIGHT[b] < POSITIONS_WEIGHT[a] ? 1 : 0
      ),
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
