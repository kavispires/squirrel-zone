import { db } from '../../services/firebase';

import store from '../../services/store';
import { setLoading } from '../../states/useLoadingState';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../../utils/constants';
import deserialize from '../deserializers/';
import serialize from '../serializers/';
import { errorNotification, successNotification } from '../utils';

/**
 * Request GET `/songs`
 */
export const fetchSongs = async () => {
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
 * Request GET `/songs/<id>`
 * @param {string} id
 */
export const fetchSong = async (id) => {
  setLoading({ type: DATA_TYPE.SONG, payload: true });

  const typeName = DATA_TYPE.SONG;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    if (!id) {
      throw Error('A song ID is required');
    }

    await db
      .ref()
      .child(collectionName)
      .child(id)
      .once('value', function (snapshot) {
        const { key } = snapshot;
        store.setRecord(serialize(snapshot.val()), key);
      });
  } catch (error) {
    errorNotification(`Failed to load ${typeName} ${id}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.SONG, payload: false });
  }
};

/**
 * Request POST `/songs`
 * @param {object} data
 */
export const saveSong = async (data) => {
  setLoading({ type: DATA_TYPE.SONG, payload: true });

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
};
