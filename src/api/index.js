import { db } from '../services/firebase';

import store from '../services/store';
import { setGlobalState } from '../states/useGlobalState';
import { setLoading } from '../states/useLoadingState';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../utils/constants';
import deserialize from './deserializers';
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
    description: error?.message ?? error ?? 'Unknown error',
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
  setLoading({ type: DATA_TYPE.ALBUM, payload: true });

  const collectionName = DATA_TYPE_COLLECTION[DATA_TYPE.ALBUM];

  try {
    await db
      .ref()
      .child(collectionName)
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification(`Failed to load ${collectionName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.ALBUM, payload: false });
  }
};

/**
 * Query `/distributions/<group_id>`
 */
const fetchDistributions = async (groupId) => {
  setLoading({ type: DATA_TYPE.DISTRIBUTION, payload: true });

  const collectionName = DATA_TYPE_COLLECTION[DATA_TYPE.DISTRIBUTION];

  try {
    if (!groupId) {
      throw Error('A group ID is required to query distributions');
    }

    await db
      .ref()
      .child(collectionName)
      .child(groupId)
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification(`Failed to load ${collectionName} for group ${groupId}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.DISTRIBUTION, payload: false });
  }
};

/**
 * Query GET `/distributions-data/<id>`
 */
const fetchDistributionData = async (distributionId) => {
  setLoading({ type: DATA_TYPE.DISTRIBUTION_DATA, payload: true });

  const typeName = DATA_TYPE.DISTRIBUTION_DATA;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    if (!distributionId) {
      throw Error('A distribution ID is required');
    }

    await db
      .ref()
      .child(collectionName)
      .child(distributionId)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load ${typeName} ${distributionId}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.DISTRIBUTION_DATA, payload: false });
  }
};

/**
 * Query POST `/distribution/<id>`
 */
const saveDistribution = async (data) => {
  setLoading({ type: DATA_TYPE.DISTRIBUTION, payload: true });

  let response;

  const typeName = DATA_TYPE.DISTRIBUTION;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    // Create new key if it is a new instance
    const key = data.id || db.ref().child(collectionName).push().key;
    const deserializedData = deserialize({ ...data, type: typeName }, key);

    const { groupId, songId } = deserializedData.distribution;

    if (!groupId) {
      throw Error('Distribution must include a group ID');
    }

    if (!songId) {
      throw Error('Distribution must include a song ID');
    }

    const distributionDataCollectionName = DATA_TYPE_COLLECTION[DATA_TYPE.DISTRIBUTION_DATA];

    await db.ref(`/${collectionName}/${groupId}/${key}`).set(deserializedData.distribution);
    await db.ref(`/${distributionDataCollectionName}/${key}`).set(deserializedData.data);

    store.setRecord(serialize(deserializedData.distribution));
    store.setRecord(serialize(deserializedData.data));

    successNotification('Distribution saved successfully', `id: ${key}`);
  } catch (error) {
    errorNotification(`Failed to save ${typeName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.DISTRIBUTION, payload: false });
  }

  return response;
};

/**
 * Query GET `/groups`
 */
const fetchGroups = async () => {
  setLoading({ type: DATA_TYPE.GROUP, payload: true });

  const collectionName = DATA_TYPE_COLLECTION[DATA_TYPE.GROUP];

  try {
    await db
      .ref()
      .child(collectionName)
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification(`Failed to load ${collectionName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.GROUP, payload: false });
  }
};

/**
 * Query POST `/groups/<id>`
 */
const saveGroup = async (data) => {
  setLoading({ type: DATA_TYPE.GROUP, payload: true });

  let response;

  const typeName = DATA_TYPE.GROUP;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    // Create new key if it is a new instance
    const key = data.id || db.ref().child(collectionName).push().key;
    const deserializedData = deserialize({ ...data, type: typeName }, key);

    await db.ref(`/${collectionName}/${key}`).set(deserializedData);
    store.setRecord(serialize(deserializedData));

    successNotification('Group saved successfully', `id: ${key}`);
  } catch (error) {
    errorNotification(`Failed to save ${typeName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.GROUP, payload: false });
  }

  return response;
};

/**
 * Query GET `/members`
 */
const fetchMembers = async () => {
  setLoading({ type: DATA_TYPE.MEMBER, payload: true });

  const collectionName = DATA_TYPE_COLLECTION[DATA_TYPE.MEMBER];

  try {
    await db
      .ref()
      .child(collectionName)
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification(`Failed to load ${collectionName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.MEMBER, payload: false });
  }
};

/**
 * Query GET `/members/<id>`
 */
const fetchMember = async (memberId) => {
  setLoading({ type: DATA_TYPE.MEMBER, payload: true });

  const typeName = DATA_TYPE.MEMBER;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    if (!memberId) {
      throw Error('A member ID is required');
    }

    await db
      .ref()
      .child(collectionName)
      .child(memberId)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load ${typeName} ${memberId}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.MEMBER, payload: false });
  }
};

/**
 * Query POST `/members/<id>`
 */
const saveMember = async (data) => {
  setLoading({ type: DATA_TYPE.MEMBER, payload: true });

  let response;

  const typeName = DATA_TYPE.MEMBER;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    // Create new key if it is a new instance
    const key = data.id || db.ref().child(collectionName).push().key;
    const deserializedData = deserialize({ ...data, type: typeName }, key);

    await db.ref(`/${collectionName}/${key}`).set(deserializedData);
    store.setRecord(serialize(deserializedData));

    successNotification('Member saved successfully', `id: ${key}`);
  } catch (error) {
    errorNotification(`Failed to save ${typeName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.MEMBER, payload: false });
  }

  return response;
};

/**
 * Query GET `/songs`
 */
const fetchSongs = async () => {
  setLoading({ type: DATA_TYPE.SONG, payload: true });

  const collectionName = DATA_TYPE_COLLECTION[DATA_TYPE.SONG];

  try {
    await db
      .ref()
      .child(collectionName)
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification(`Failed to load ${collectionName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.SONG, payload: false });
  }
};

/**
 * Query GET `/songs/<id>`
 */
const fetchSong = async (songId) => {
  setLoading({ type: DATA_TYPE.SONG, payload: true });

  const typeName = DATA_TYPE.SONG;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    if (!songId) {
      throw Error('A song ID is required');
    }

    await db
      .ref()
      .child(collectionName)
      .child(songId)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load ${typeName} ${songId}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.SONG, payload: false });
  }
};

/**
 * Query GET `/songs-data/<id>`
 */
const fetchSongData = async (songId) => {
  setLoading({ type: DATA_TYPE.SONG_DATA, payload: true });

  const typeName = DATA_TYPE.SONG_DATA;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    await db
      .ref()
      .child(collectionName)
      .child(songId)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load ${typeName} ${songId}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.SONG_DATA, payload: false });
  }
};

/**
 * Query POST `/songs/<id>`
 */
const saveSong = async (data) => {
  setLoading({ type: DATA_TYPE.SONG, payload: true });

  let response;
  const typeName = DATA_TYPE.SONG;
  const collectionName = DATA_TYPE_COLLECTION[typeName];
  const dataCollectionName = DATA_TYPE_COLLECTION[DATA_TYPE.SONG_DATA];

  try {
    // Create new key if it is a new instance
    const key = data.id || db.ref().child('songs').push().key;
    const deserializedSong = deserialize({ ...data.song }, key);
    const deserializedSongData = deserialize({ ...data.data }, key);

    await db.ref(`/${collectionName}/${key}`).set(deserializedSong);
    store.setRecord(serialize(deserializedSong));

    await db.ref(`/${dataCollectionName}/${key}`).set(deserializedSongData);
    store.setRecord(serialize(deserializedSongData));

    successNotification('Song saved successfully', `id: ${key}`);
  } catch (error) {
    errorNotification(`Failed to save ${typeName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.SONG, payload: false });
  }

  return response;
};

const API = {
  fetchAlbums,
  fetchDistributions,
  fetchDistributionData,
  fetchGroups,
  fetchMembers,
  fetchMember,
  fetchSongs,
  fetchSong,
  fetchSongData,
  saveDistribution,
  saveGroup,
  saveMember,
  saveSong,
};

export default API;
