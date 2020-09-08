import { createGlobalState } from 'react-hooks-global-state';
import DEFAULTS from '../utils/properties/defaults';

const initialState = {
  furColor: DEFAULTS.FUR,
  snoutColor: DEFAULTS.HEAD.SNOUT,
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
