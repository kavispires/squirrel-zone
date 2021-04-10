import * as COLOR from './color';
import * as SHAPE from './shape';

export const APPEARANCE = {
  COLOR,
  SHAPE,
};

export const SVG_LAYERS = [
  'TAIL', // 4-8 variations
  'TAIL_ACCESSORIES', // 4-8 variations
  'BACK', // (16 variations v2.0)
  'HAIR_STYLE', // 16-32 variations
  'BODY',
  'CLOTHING', // 4 variations (32 v2.0)
  'CLOTHING_ACCESSORIES', // (16 variations v2.0)
  'HEAD',
  'EYES_VARIATIONS', // 4-8 variations (dark circles, mascara, makeup, none)
  'EYES',
  'EYES_ACCESSORIES',
  'FACE_VARIATIONS', // 16 (mole 4, freckles, rosacea, acne, scar 4, tattoo 4, none)
  'FACIAL_HAIR', // 8 variations
  'NOSE',
  'MOUTH',

  'RINGS', // 8 variations (including nose and ear rings, no mouth)
  'BANGS', // 16-32 variations
  'HEAD_PIECE', // 16 variations
];

// {
//   id: 'CATEGORY.GROUP.NAME',
//   type: 'color',
//   category: 'CATEGORY',
//   group: 'GROUP',
//   name: 'NAME',
//   value: '#000000',
//   rate: 0,
// },

export function makeObject(arr) {
  const result = arr.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
  console.log({ result });
  return result;
}

export const getRandomAppearanceId = (function () {
  const cache = {};

  function generate(libraryGroupName, libraryName) {
    const libraryId = `${libraryGroupName}.${libraryName}`;

    if (cache[libraryId] === undefined) {
      let lastRate = 0;
      cache[libraryId] = Object.values(APPEARANCE[libraryGroupName][libraryName]).reduce((acc, item) => {
        lastRate += item.rate;
        acc[lastRate] = item.id;
        return acc;
      }, []);
      if (cache[libraryId].length !== 101) {
        console.warn(`Items rates for ${libraryId} don't add up`);
      }
    }

    const items = cache[libraryId];
    let randomIndex = Math.floor(Math.random() * 100);
    let result = items[randomIndex];

    while (!Boolean(result)) {
      randomIndex += 1;
      result = items[randomIndex];
    }
    console.log('Generated', result, 'for', libraryId);
    return result;
  }

  return generate;
})();
