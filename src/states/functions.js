import store from '../services/store';
import { Line, Part, Section, Song } from '../utils/distributor';
import { setGlobalState } from './useDistributorState';

export const loadSongState = async (songId) => {
  setGlobalState('isFullyLoaded', false);

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

  setGlobalState('parts', newParts);
  setGlobalState('lines', newLines);
  setGlobalState('sections', newSections);
  setGlobalState('song', newSong);
  setGlobalState('videoId', newSong.videoId);
  setGlobalState('step', newSong.isComplete ? '3' : '2');
  setGlobalState('isFullyLoaded', true);
};
