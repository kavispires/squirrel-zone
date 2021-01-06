import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  notification: {
    type: null,
    message: null,
    description: null,
  },
  isLoading: false,
};

const { useGlobalState, setGlobalState, getGlobalState } = createGlobalState(initialState);

export { setGlobalState, getGlobalState };

export default useGlobalState;
