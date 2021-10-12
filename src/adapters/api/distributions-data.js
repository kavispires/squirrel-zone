import { db } from '../../services/firebase';

import store from '../../services/store';
import { setLoading } from '../../states/useLoadingState';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../../utils/constants';
import serialize from '../serializers/';
import { errorNotification } from '../utils';

/**
 * Request GET `/distributions-data/<id>`
 * @param {string} distributionId
 */
export const fetchDistributionData = async (distributionId) => {
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
