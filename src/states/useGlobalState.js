import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  notification: {
    type: null,
    message: null,
    description: null,
  },
  isLoading: false,

  activeGroup: null,
  activeGroupSongs: {},
  activeMembers: null,
  activeSong: null,
  activeSongData: null,
  activeDistribution: null,
  activeDistributionData: null,

  // TODO: Probably can be removed
  loadedLineDistribution: {},
  lineDistribution: {},
  stats: {},
};

const { useGlobalState, setGlobalState, getGlobalState } = createGlobalState(initialState);

export { setGlobalState, getGlobalState };

export default useGlobalState;
