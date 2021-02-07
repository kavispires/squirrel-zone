import { createStore } from 'react-hooks-global-state';
import { DATA_TYPE } from '../utils/constants';

const reducer = (state, action) => {
  const newState = { ...state };

  if (reducerTypeMapping[action.type]) {
    newState[reducerTypeMapping[action.type]] = action.payload;
  } else {
    console.warn('Invalid loading type', { action });
    return state;
  }

  delete newState.isLoading;
  newState.isLoading = Object.values(newState).some((v) => v);
  return newState;
};

const initialState = {
  isLoading: false,
  isAlbumLoading: false,
  isDistributionLoading: false,
  isDistributionDataLoading: false,
  isGroupLoading: false,
  isMemberLoading: false,
  isMemberDataLoading: false,
  isSongLoading: false,
  isSongDataLoading: false,
};

const reducerTypeMapping = {
  [DATA_TYPE.ALBUM]: 'isAlbumLoading',
  [DATA_TYPE.DISTRIBUTION]: 'isDistributionLoading',
  [DATA_TYPE.DISTRIBUTION_DATA]: 'isDistributionDataLoading',
  [DATA_TYPE.GROUP]: 'isGroupLoading',
  [DATA_TYPE.MEMBER]: 'isMemberLoading',
  [DATA_TYPE.MEMBER_DATA]: 'isMemberDataLoading',
  [DATA_TYPE.SONG]: 'isSongLoading',
  [DATA_TYPE.SONG_DATA]: 'isSongDataLoading',
};

const { dispatch, useGlobalState } = createStore(reducer, initialState);

export { dispatch as setLoading, reducerTypeMapping, useGlobalState as useLoadingState };

export default useGlobalState;
