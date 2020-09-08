import { createGlobalState } from 'react-hooks-global-state';
import DEFAULTS from '../utils/properties/defaults';

const initialState = {
  furColor: DEFAULTS.FUR,
  // HEAD
  snoutColor: DEFAULTS.HEAD.SNOUT,
  noseColor: DEFAULTS.HEAD.NOSE,
  eyeColor: DEFAULTS.HEAD.EYES,
  // BODY

  // TAIL
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
