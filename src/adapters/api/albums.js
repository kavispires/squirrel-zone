import { db } from '../../services/firebase';

import store from '../../services/store';
import { setLoading } from '../../states/useLoadingState';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../../utils/constants';
import serialize from '../serializers/';
import { errorNotification } from '../utils';

/**
 * Request GET `/albums`
 */
export const fetchAlbums = async () => {
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
