import { db } from '../services/firebase';

import store from '../services/store';
import { setGlobalState } from '../states/useGlobalState';
import { cleanupObject } from '../utils/distributor';
import serialize from './serializers';

/**
 * Sets a global error notification.
 * @param {string} message
 * @param {*} error
 */
const errorNotification = (message, error) => {
  setGlobalState('notification', {
    type: 'error',
    message: message || 'Fail to do something in the API',
    description: error?.message ?? 'Unknown error',
  });
  console.error(error);
};

/**
 * Sets a global success notification.
 * @param {string} message
 * @param {*} description
 */
const successNotification = (message, description) => {
  setGlobalState('notification', {
    type: 'success',
    message: message || 'Action Successful',
    description: description || 'It worked',
  });
};

// API

/**
 * Query GET `/albums`
 */
const fetchAlbums = async () => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('albums')
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification('Failed to load albums', error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query `/distributions`
 */
const fetchDistributions = async () => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('distributions')
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification('Failed to load distributions', error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query GET `/groups`
 */
const fetchGroups = async () => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('groups')
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification('Failed to load groups', error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query GET `/members`
 */
const fetchMembers = async () => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('members')
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification('Failed to load members', error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query GET `/members/<id>`
 */
const fetchMember = async (memberId) => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('members')
      .child(memberId)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load song ${memberId}`, error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query POST `/members/<id>`
 */
const saveMember = async (data) => {
  setGlobalState('isLoading', true);

  let response;

  try {
    // Create new key if it is a new instance
    const key = data.id || db.ref().child('members').push().key;
    data.id = key;
    data.type = 'member';

    data = cleanupObject(data);

    await db.ref(`/members/${key}`).set({ ...data });
    store.setRecord(serialize(data), key);

    successNotification('Member saved successfully', `id: ${key}`);
  } catch (error) {
    errorNotification('Failed to save member', error);
  } finally {
    setGlobalState('isLoading', false);
  }

  return response;
};

/**
 * Query GET `/songs`
 */
const fetchSongs = async () => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('songs')
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification('Failed to load songs', error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query GET `/songs/<id>`
 */
const fetchSong = async (songId) => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('songs')
      .child(songId)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load song ${songId}`, error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query GET `/songs-data/<id>`
 */
const fetchSongData = async (songId) => {
  setGlobalState('isLoading', true);

  try {
    await db
      .ref()
      .child('songs-data')
      .child(songId)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load song ${songId}`, error);
  } finally {
    setGlobalState('isLoading', false);
  }
};

/**
 * Query POST `/songs/<id>`
 */
const saveSong = async (data) => {
  setGlobalState('isLoading', true);

  let response;

  try {
    // Create new key if it is a new instance
    const key = data.id || db.ref().child('songs').push().key;
    data.song.id = key;
    data.data.id = key;

    await db.ref(`/songs/${key}`).set({ ...data.song });
    store.setRecord(serialize(data.song), key);

    await db.ref(`/songs-data/${key}`).set({ ...data.data });
    store.setRecord(serialize(data.data), key);

    successNotification('Song saved successfully', `id: ${key}`);
  } catch (error) {
    errorNotification('Failed to save song', error);
  } finally {
    setGlobalState('isLoading', false);
  }

  return response;
};

const API = {
  fetchAlbums,
  fetchDistributions,
  fetchGroups,
  fetchMembers,
  fetchMember,
  fetchSongs,
  fetchSong,
  fetchSongData,
  saveMember,
  saveSong,
};

export default API;
