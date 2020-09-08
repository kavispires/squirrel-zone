import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  furColor: 0,
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
