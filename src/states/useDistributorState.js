import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  step: '0',
  videoId: null,
  isRecording: false,
  song: null,
  sections: {},
  lines: {},
  parts: {},
  activeInstance: null,
  selection: [],
  unassignedTimestamps: {},
  assignee: 'A',

  selectedTimestamps: [],
  isPlaying: false,

  isFullyLoaded: false,

  currentLine: null,
  currentSection: null,
  timestamp: 0,
};

const { useGlobalState, setGlobalState, getGlobalState } = createGlobalState(initialState);

export { setGlobalState as setDistributorGlobalState, getGlobalState as getDistributorGlobalState };

export default useGlobalState;
