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

  const newSong = new Song({ ...song, sectionsIds: songData.sectionsIds });

  // Created instances looping through included data
  const newSections = {};
  const newLines = {};
  const newParts = {};
  songData.included.forEach((entry) => {
    if (entry.type === 'section') {
      const newInstance = new Section(entry);
      return (newSections[newInstance.id] = newInstance);
    }
    if (entry.type === 'line') {
      const newInstance = new Line(entry);
      return (newLines[newInstance.id] = newInstance);
    }
    if (entry.type === 'part') {
      const newInstance = new Part(entry);
      return (newParts[newInstance.id] = newInstance);
    }
  });

  setDistributorGlobalState('parts', newParts);
  setDistributorGlobalState('lines', newLines);
  setDistributorGlobalState('sections', newSections);
  setDistributorGlobalState('song', newSong);
  setDistributorGlobalState('videoId', newSong.videoId);
  setDistributorGlobalState('step', newSong.isComplete ? '3' : '2');
  setDistributorGlobalState('isFullyLoaded', true);
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
