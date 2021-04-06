import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  songId: null,
  distributionId: null,
  previewMembers: [],
  previewBars: [],
  previewLyrics: [],
};

const { useGlobalState, setGlobalState, getGlobalState } = createGlobalState(initialState);

export { setGlobalState as setPreviewGlobalState, getGlobalState as getPreviewGlobalState };

export default useGlobalState;
