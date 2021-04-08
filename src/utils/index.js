import { POSITIONS_WEIGHT, SEPARATOR } from './constants';

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
 * Create a key based of type and id of the instance
 * @param {string} type
 * @param {string} id
 * @returns {string} <type>::<id>
 */
export const serializeKey = (type, id) => `${type}${SEPARATOR}${id}`;

/**
 * Split a key by the common separator into an array of type, id
 * @param {string} key
 * @returns {[string, string]} type and id
 */
export const deserializeKey = (key) => key.split(SEPARATOR);

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

/**
 * Replace spaces and underscores with dash/hyphen
 * @param {string} str
 * @returns {string}
 */
export const dasherize = (str = '') => {
  return str.toLowerCase().replace(/(_|\s)+/g, '-');
};

/**
 * Humanize a string by removing underscores and hyphens replacing them by spaces and capitalizing their first words
 * @param {string} str
 * @returns {string}
 */
export const humanize = (str = '') => {
  return str
    .toLowerCase()
    .replace(/(_|-)+/g, ' ')
    .split(' ')
    .map((s) => `${s[0].toUpperCase()}${s.substring(1)}`)
    .join(' ');
};

/**
 * Sort list of positions by their importance weight.
 * @param {string[]} positions
 * @returns {string[]}
 */
export const sortPositions = (positions) => {
  return positions.sort((a, b) =>
    POSITIONS_WEIGHT[b] > POSITIONS_WEIGHT[a] ? -1 : POSITIONS_WEIGHT[b] < POSITIONS_WEIGHT[a] ? 1 : 0
  );
};

export const generateUniqueId = (function () {
  const cache = {};

  function generate(length = 5) {
    const id = '_' + Math.random().toString(36).substr(2, length);
    if (cache[id]) {
      return generate(length);
    }

    cache[id] = true;
    return id;
  }

  return generate;
})();

export const generateTempId = (function () {
  let lastId = 100;

  function generate() {
    const id = lastId + 1;
    lastId = id;
    return id;
  }

  return generate;
})();

export const convertStoMS = (seconds) => {
  return Math.round(seconds * 1000);
};

/**
 * Get value with default fallback.
 * @param {*} context
 * @param {object} data
 * @param {string} propertyName
 * @param {*} [defaultValue]
 */
export const getDefault = (context, data, propertyName, defaultValue = null) => {
  return data[propertyName] ?? context[propertyName] ?? defaultValue;
};

/**
 * Get value with default fallback only if the value is undefined.
 * @param {*} context
 * @param {object} data
 * @param {string} propertyName
 * @param {*} [defaultValue]
 */
export const getNullDefault = (context, data, propertyName, defaultValue = null) => {
  return data[propertyName] === undefined ? context[propertyName] ?? defaultValue : data[propertyName];
};

/**
 * Get enum value with default fallback.
 * @param {*} context
 * @param {object} data
 * @param {string} propertyName
 * @param {object} enumObj
 * @param {string} defaultValue
 */
export const getEnumDefault = (context, data, propertyName, enumObj, defaultValue) => {
  return data[propertyName] ? enumObj[data[propertyName]] : context[propertyName] ?? defaultValue;
};

/**
 * Get relationships ids from list of instances or strings.
 * @param {*} context
 * @param {object} data
 * @param {string} propertyName
 * @param {Class} instance
 */
export const getRelationshipsDefault = (context, data, propertyName, instance) => {
  return (data[propertyName] ?? context[propertyName] ?? []).reduce((ids, entry) => {
    if (entry instanceof instance) {
      ids.push(entry.id);
    } else if (typeof entry === 'string') {
      ids.push(entry);
    }
    return ids;
  }, []);
};

/**
 * Fallback to null if value of property is the same as the default value
 * @param {*} data
 * @param {*} propertyName
 * @param {*} defaultValues
 */
export const nullifyDefault = (data, propertyName, defaultValues) => {
  return data[propertyName] === defaultValues[propertyName] ? null : data[propertyName];
};

/**
 * Compare the entries of given list of ids/keys and return all equal values.
 * @param {*} dict
 * @param {*} list
 * @param {boolean} [isKey]
 */
export const getDuplicatedData = (dict, list, isKey = false) => {
  const entries = list.map((entry) => {
    const id = isKey ? deserializeKey(entry)[1] : entry;
    return dict[id].data;
  });

  return entries.reduce((result, item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (result[key] !== value) {
        delete result[key];
      }
    });

    return result;
  }, entries[0]);
};

/**
 * Call deserialize in every instance in the ids list with given data
 * @param {object} library - the library with given instances (parts, lines, sections)
 * @param {string[]} ids - the list of keys or ids
 * @param {object} data - the data that needs to be deserialized
 * @param {boolean} isKey - flag indicating if the items in ids are keys
 */
export const batchDeserializeInstancesSameData = (library, ids, data, isKey = false) => {
  ids.forEach((entry) => {
    const id = isKey ? deserializeKey(entry)[1] : entry;
    return library[id].deserialize(data);
  });
};

/**
 * Removes any object key that value is undefined or null or an empty string
 * @param {object} obj
 * @returns {object}
 */
export const cleanupObject = (obj) => {
  return Object.keys(obj)
    .filter((k) => obj[k] != null && obj[k] !== undefined && obj[k] !== '')
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
};

/**
 * Check if two arrays are similar (have the same elements, even if in different order)
 * Note: it won't work with arrays with non primitive elements
 * @param {array} a
 * @param {array} b
 * @return {boolean}
 */
export const areArraysSimilar = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

/**
 * Extract youtube video id from url
 * @param {string} link
 */
export const extractYoutubeIdFromUrl = (link) => {
  const splitLink = link.split('v=');

  if (splitLink.length === 1) return splitLink[0];

  const [videoId] = splitLink[1].split('&');

  return videoId;
};
