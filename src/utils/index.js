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
 * @param  {...any} args
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
 * Output base class with modifier if condition is positive
 * @param {string} baseClass
 * @param {string} modifier
 * @param {boolean} condition
 */
export const bemClassConditionalModifier = (baseClass, modifier, condition) => {
  return bemClass(baseClass, getBemModifier(condition, modifier));
};

/**
 * Calculate the duration of a timestamp object.
 * @param {{ endTime: number, startTime: number}} param0
 */
export const getTimestampDuration = ({ endTime, startTime }) => endTime - startTime;
