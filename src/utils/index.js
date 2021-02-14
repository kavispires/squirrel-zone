import { serializeKey } from './distributor';

const wasPrinted = {};
export function printProps(props, name = 'PROP') {
  if (wasPrinted[name] !== undefined) return;

  wasPrinted[name] = true;

  console.log(name);
  console.log('Colors:', props.map((e) => e.hex).join(', ') + ';');
  console.log(
    'Rate:',
    props.reduce((acc, f) => {
      return acc + f.rate;
    }, 0)
  );
  console.log('Count:', props.length);
  console.log('==========');
}

/**
 * Generate classes modifiers with always the base class (first argument) present
 * @param  {...any} args - The first argument is the base class
 * @returns {string}
 */
export const bemClass = (...args) => {
  if (args.length === 0) return Error('Missing required baseClass');

  const baseClass = args[0];
  return args.filter((c) => c).join(` ${baseClass}--`);
};

/**
 * Return modifier if condition is met, else empty string
 * @param {boolean|*} condition
 * @param {string} modifier
 * @return {string}
 */
export const getBemModifier = (condition, modifier) => {
  return Boolean(condition) ? modifier : '';
};

/**
 * Output base class with modifier if condition is positive, otherwise, just base class
 * @param {string} baseClass
 * @param {string} modifier
 * @param {boolean} condition
 * @returns {string}
 */
export const bemClassConditionalModifier = (baseClass, modifier, condition) => {
  return bemClass(baseClass, getBemModifier(condition, modifier));
};

/**
 * Calculate the duration of a timestamp object.
 * @param {{ endTime: number, startTime: number}} timestamps
 * @returns {number}
 */
export const getTimestampDuration = ({ endTime, startTime }) => endTime - startTime;

/**
 * Convert a timestamp into a frame based on the framerate.
 * @param {number} timestamp
 * @param {number} framerate
 * @returns {number}
 */
export const getFrameFromTimestamp = (timestamp, framerate) => {
  return Math.floor(timestamp / (1000 / framerate));
};

/**
 * Convert a frame int a timestamp based on the framerate
 * @param {number} frame
 * @param {number} framerate
 * @returns {number}
 */
export const getTimestampFromFrame = (frame, framerate) => {
  return frame * (1000 / framerate);
};

/**
 * Creates an mock distribution with random assignees
 * @param {Part{}} partsIds
 * @return {object}
 */
export const buildMockDistribution = (parts) => {
  const data = Object.values(parts).reduce((acc, part) => {
    acc[part.id] = { [serializeKey('member', part.assignee)]: true };
    return acc;
  }, {});

  return {
    id: 'sample-distribution-id',
    type: 'distribution',
    groupId: 'sample-group-id',
    songId: 'sample-song-id',
    data,
  };
};

/**
 * Injects a song id into the sections in the included array.
 * This is necessary when the song is about to be created and does not have an id yet.
 * @param {object[]} includedData
 * @param {string} songId
 * @returns {object[]}
 */
export const injectSongIdToSections = (includedData, songId) => {
  return includedData.map((instance) => {
    if (instance.type === 'section') {
      instance.songId = songId;
    }
    return instance;
  });
};

/**
 * Adds # to the beginning of a hex color if it doesn't exist.
 * @param {string} hexColor
 * @returns {strings}
 */
export const parseColor = (hexColor) => {
  return hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
};

/**
 * Makes a deep copy of given data.
 * @param {*} data
 * @return {*}
 */
export const deepCopy = (data) => JSON.parse(JSON.stringify(data));

/**
 * Removes unnecessary data (lines) from stats object
 * @param {object} stats
 */
export const cleanupStats = (stats) => {
  const data = deepCopy(stats);
  Object.values(data).forEach((entry) => {
    delete entry.lines;
  });
  return data;
};
