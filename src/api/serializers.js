import { parseColor } from '../utils';
import { DATA_TYPE } from '../utils/constants';
import { serializeKey } from '../utils/distributor';

const serialize = (data, id) => {
  switch (data.type) {
    case DATA_TYPE.DISTRIBUTION:
      return serializer.distribution(data, id);
    case DATA_TYPE.DISTRIBUTION_DATA:
      return serializer.distributionData(data, id);
    case DATA_TYPE.GROUP:
      return serializer.group(data, id);
    case DATA_TYPE.MEMBER:
      return serializer.member(data, id);
    case DATA_TYPE.SONG:
      return serializer.song(data, id);
    case DATA_TYPE.SONG_DATA:
      return serializer.songData(data, id);
    default:
      return { ...data, key: serializeKey(data.type, id ?? data.id) };
  }
};

const serializer = {
  distribution: (data, id) => {
    return {
      id: id ?? data.id,
      type: data.type,
      key: serializeKey(data.type, id ?? data.id),
      name: data.name,
      songId: data.songId,
      songTitle: data.songTitle,
      groupId: data.groupId,
      stats: JSON.parse(data.stats ?? '') || {},
    };
  },
  distributionData: (data, id) => {
    return {
      id: id ?? data.id,
      type: data.type,
      key: serializeKey(data.type, id ?? data.id),
      groupId: data.groupId,
      assignedParts: JSON.parse(data.assignedParts ?? '') || {},
    };
  },
  group: (data, id) => {
    return {
      id: id ?? data.id,
      type: data.type,
      key: serializeKey(data.type, id ?? data.id),
      name: data.name,
      debutYear: data.debutYear ?? 0,
      disbandmentYear: data.disbandmentYear ?? 0,
      membersIds: data.membersIds ?? [],
    };
  },
  member: (data, id) => {
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
      isContestant: data.isContestant ?? false,
      positions: data.positions ?? [],
    };
  },
  song: (data, id) => {
    return {
      id: id ?? data.id,
      type: data.type,
      key: serializeKey(data.type, id ?? data.id),
      albumId: data.albumId ?? 'N/A',
      completion: data.completion,
      createdAt: data.createdAt,
      duration: data.duration ?? '00:00',
      genre: data.genre ?? '',
      idealGroupSize: data.idealGroupSize ?? 5,
      isComplete: data.isComplete,
      isSingle: Boolean(data.isSingle),
      style: data.style ?? '',
      tempo: data.tempo ?? 0,
      title: data.title ?? 'Untitled',
      version: data.version ?? '',
      videoId: data.videoId,
      updatedAt: data.updatedAt,
    };
  },

  songData: (data, id) => {
    return {
      id: id ?? data.id,
      type: data.type,
      key: serializeKey(data.type, id ?? data.id),
      sectionsIds: JSON.parse(data.sectionsIds ?? '') || [],
      included: JSON.parse(data.included ?? '') || [],
    };
  },
};

export default serialize;
