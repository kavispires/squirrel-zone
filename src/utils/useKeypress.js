import { useEffect } from 'react';

/**
 * useKeyUp
 * @param {string[]} keys - the name of the keys to respond to, compared against event.key
 * @param {function} action - the action to perform on key up
 */
export function useKeyUp(keys, action) {
  useEffect(() => {
    function onKeyup(e) {
      if (keys.includes(e.key)) action(e.key);
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);
}

/**
 * useKeyUp
 * @param {string[]} keys - the name of the keys to respond to, compared against event.key
 * @param {function} action - the action to perform on key down
 */
export function useKeyDown(keys, action) {
  useEffect(() => {
    function onKeyDown(e) {
      if (keys.includes(e.key)) action(e.key);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
