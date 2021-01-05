import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  // videoId: null, // _1dZKhxrSoA
  step: '0',
  videoId: '_1dZKhxrSoA',
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

  currentLine: null,
  currentSection: null,
  timestamp: 0,
};

const { useGlobalState, setGlobalState, getGlobalState } = createGlobalState(initialState);

export { setGlobalState, getGlobalState };

export default useGlobalState;
