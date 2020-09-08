import { createGlobalState } from 'react-hooks-global-state';
import DEFAULTS from '../utils/properties/defaults';

const initialState = {
  furColor: DEFAULTS.FUR,
  snoutColor: DEFAULTS.HEAD.SNOUT,
  noseColor: DEFAULTS.HEAD.NOSE,
  eyeColor: DEFAULTS.HEAD.EYES,
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
