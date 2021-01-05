import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  notification: {
    type: null,
    message: null,
  },
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
