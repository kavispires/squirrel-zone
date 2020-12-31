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

export const convertStoMS = (seconds) => {
  return Math.round(seconds * 1000);
};

const SEPARATOR = '::';

export const serializeKey = (id, type) => `${type}${SEPARATOR}${id}`;

export const deserializeKey = (key) => key.split(SEPARATOR);
