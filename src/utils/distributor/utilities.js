import { SEPARATOR } from '../constants';

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

export const serializeKey = (type, id) => `${type}${SEPARATOR}${id}`;

export const deserializeKey = (key) => key.split(SEPARATOR);

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
 * Removes any object key that is undefined or null
 * @param {object} obj
 * @returns {object}
 */
export const cleanupObject = (obj) => {
  return Object.keys(obj)
    .filter((k) => obj[k] != null && obj[k] !== undefined)
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
};
