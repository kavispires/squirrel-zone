import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  // videoId: null, // _1dZKhxrSoA
  videoId: '_1dZKhxrSoA',
  isRecording: false,
  assignee: 'A',
  song: null,
  currentLine: null,
  currentSection: null,
  timestamp: 0,
  activeInstance: null,
  unassignedParts: [],
};

const { useGlobalState, setGlobalState } = createGlobalState(initialState);

export { setGlobalState };

export default useGlobalState;
