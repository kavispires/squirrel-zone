import { db } from '../../services/firebase';

import store from '../../services/store';
import { setLoading } from '../../states/useLoadingState';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../../utils/constants';
import deserialize from '../deserializers/';
import serialize from '../serializers/';
import { errorNotification, successNotification } from '../utils';

/**
 * Request `/distributions/<group_id>`
 * @param {string} groupId
 */
export const fetchDistributions = async (groupId) => {
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
 * Request `/distributions/<group_id>/<distribution_id>`
 * @param {string} groupId
 */
export const fetchDistribution = async (distributionId, groupId) => {
  setLoading({ type: DATA_TYPE.DISTRIBUTION, payload: true });

  const typeName = DATA_TYPE.DISTRIBUTION;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    if (!groupId) {
      throw Error('A group ID is required to query a distribution');
    }

    if (!distributionId) {
      throw Error('A distribution ID is required to query a distribution');
    }

    await db
      .ref()
      .child(collectionName)
      .child(groupId)
      .child(distributionId)
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const { key } = childSnapshot;
          store.setRecord(serialize(childSnapshot.val()), key);
        });
      });
  } catch (error) {
    errorNotification(`Failed to load ${typeName} ${distributionId} for group ${groupId}`, error);
  } finally {
    setLoading({ type: typeName, payload: false });
  }
};

/**
 * Request POST `/distribution/<id>`
 * @param {object} data
 * @returns
 */
export const saveDistribution = async (data) => {
  setLoading({ type: DATA_TYPE.DISTRIBUTION, payload: true });

  const typeName = DATA_TYPE.DISTRIBUTION;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  let response;

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

    response = store.getRecord('distribution', key, groupId);

    successNotification('Distribution saved successfully', `id: ${key}`);
  } catch (error) {
    errorNotification(`Failed to save ${typeName}`, error);
  } finally {
    setLoading({ type: DATA_TYPE.DISTRIBUTION, payload: false });
  }

  return response;
};
