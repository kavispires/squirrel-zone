import { useEffect } from 'react';

/**
 * useKeyUp
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key up
 */
export function useKeyUp(key, action) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action(key);
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);
}

/**
 * useKeyUp
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key down
 */
export function useKeyDown(key, action) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === key) action(key);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
