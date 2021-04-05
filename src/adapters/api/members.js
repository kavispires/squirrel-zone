import { db } from '../../services/firebase';

import store from '../../services/store';
import { setLoading } from '../../states/useLoadingState';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../../utils/constants';
import deserialize from '../deserializers/';
import serialize from '../serializers/';
import { errorNotification, successNotification } from '../utils';

/**
 * Request GET `/members`
 */
export const fetchMembers = async () => {
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
 * Request GET `/members/<id>`
 * @param {string} id
 */
export const fetchMember = async (id) => {
  setLoading({ type: DATA_TYPE.MEMBER, payload: true });

  const typeName = DATA_TYPE.MEMBER;
  const collectionName = DATA_TYPE_COLLECTION[typeName];

  try {
    if (!id) {
      throw Error('A member ID is required');
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
    setLoading({ type: DATA_TYPE.MEMBER, payload: false });
  }
};

/**
 * Request POST `/members`
 * @param {object} data
 */
export const saveMember = async (data) => {
  setLoading({ type: DATA_TYPE.MEMBER, payload: true });

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
};
