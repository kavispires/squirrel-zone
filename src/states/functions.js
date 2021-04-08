// Services
import store from '../services/store';
// Models
import { Line, Part, Section, Song } from '../models';
// Utils
import { DEFAULT_MEMBERS } from '../utils/constants';
import { serializeKey } from '../utils';
import { setDistributorGlobalState } from './useDistributorState';
import { setGlobalState } from './useGlobalState';

export const loadSongState = async (songId) => {
  setDistributorGlobalState('isFullyLoaded', false);

  const song = await store.getRecord('song', songId);
  const songData = await store.getRecord('song-data', songId);

  return loadSongStateOffline(song, songData);
};

export const loadSongStateOffline = async (song, songData) => {
  setDistributorGlobalState('isFullyLoaded', false);

  const newSong = new Song({ ...song, sectionsIds: songData.sectionsIds });

  const newSections = Object.values(songData.included.sections).reduce((acc, section) => {
    acc[section.id] = new Section(section);
    return acc;
  }, {});

  const newLines = Object.values(songData.included.lines).reduce((acc, line) => {
    acc[line.id] = new Line(line);
    return acc;
  }, {});

  const newParts = Object.values(songData.included.parts).reduce((acc, part) => {
    acc[part.id] = new Part(part);
    return acc;
  }, {});

  setDistributorGlobalState('parts', newParts);
  setDistributorGlobalState('lines', newLines);
  setDistributorGlobalState('sections', newSections);
  setDistributorGlobalState('song', newSong);

  setDistributorGlobalState('videoId', newSong.videoId);
  // setDistributorGlobalState('step', newSong.isComplete ? '3' : '2');
  setDistributorGlobalState('isFullyLoaded', true);
  return true;
};

export const loadActiveMembers = async (group, includeDefault = false) => {
  const members = await store.getCollection('members', true);

  const activeMembers = group.membersIds.reduce((acc, memberId) => {
    const key = serializeKey('member', memberId);
    acc[key] = { ...members[key] };
    return acc;
  }, {});

  if (includeDefault) {
    const activeMembersNew = { ...activeMembers, ...DEFAULT_MEMBERS };
    setGlobalState('activeMembers', activeMembersNew);
    return activeMembersNew;
  }

  const activeMembersNew = { ...activeMembers };
  setGlobalState('activeMembers', activeMembersNew);

  return activeMembersNew;
};

export const loadActiveGroupSongs = async (groupId) => {
  const groupDistributionsResponse = await store.getCollection('distributions', null, {
    groupId: groupId,
  });
  const activeGroupSongs = groupDistributionsResponse.reduce((acc, dist) => {
    acc[dist.songId] = true;
    return acc;
  }, {});

  setGlobalState('activeGroupSongs', activeGroupSongs);

  return activeGroupSongs;
};

export const loadActiveDistribution = async (groupId, distributionId) => {
  const distributionResponse = await store.getRecord('distribution', distributionId, groupId);
  const distributionDataResponse = await store.getRecord('distribution-data', distributionId);

  setGlobalState('activeDistribution', distributionResponse);
  setGlobalState('activeDistributionData', distributionDataResponse);
  return distributionResponse;
};

export const loadActiveSong = async (songId) => {
  const songResponse = await store.getRecord('song', songId);
  const songDataResponse = await store.getRecord('song-data', songId);

  setGlobalState('activeSong', songResponse);
  setGlobalState('activeSongData', songDataResponse);

  return songResponse;
};

export const resetStateForDistribution = async () => {
  setGlobalState('activeMembers', null);
  setGlobalState('activeGroupSongs', {});
  setGlobalState('activeDistribution', null);
  setGlobalState('activeDistributionData', null);
  setGlobalState('activeSong', null);
  setGlobalState('activeSongData', null);
};

export const setupNewActiveDistribution = async ({ groupId, songId, songTitle }) => {
  setGlobalState('activeDistribution', {
    id: null,
    type: 'distribution',
    name: null,
    songId,
    songTitle,
    groupId,
    stats: {},
  });
  setGlobalState('activeDistributionData', {
    id: null,
    type: 'distribution-data',
    groupId,
    assignedParts: {},
  });
};
