import { db } from '../../services/firebase';

import store from '../../services/store';
import { setLoading } from '../../states/useLoadingState';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../../utils/constants';
import serialize from '../serializers/';
import { errorNotification } from '../utils';

/**
 * Request GET `/songs-data/<id>`
 */
export const fetchSongData = async (songId) => {
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
