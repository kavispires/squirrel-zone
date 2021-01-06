import API from '../api';
import { serializeKey } from '../utils/distributor';

export class Store {
  constructor() {
    this._records = {};
    this._collections = {};

    this._loaded = {};
    this._loadedInstance = {};
  }

  /**
   * Retrieves record from the store or fetches the API.
   * @param {string} type
   * @param {string} id
   * @returns {object}
   */
  async getRecord(type, id) {
    if (!type) throw Error('A type is required to access the store');

    if (!id) throw Error('An id is required to access a store record');

    const key = serializeKey(type, id);

    if (this._records[key]) {
      return this._records[key];
    }

    switch (type) {
      case 'song':
        await API.fetchSong(id);
        break;
      case 'song-data':
        await API.fetchSongData(id);
        break;

      default:
        throw Error(`Provided type ${type} is not supported`);
    }

    this._loaded[key] = Date.now();
    return this._records[key];
  }

  /**
   * Retrieves collection of data from the store or fetches the API
   * @param {string} type
   * @returns {object[]}
   */
  async getCollection(type) {
    if (!type) throw Error('A type is required to access the store');

    if (this._collections[type] && Object.values(this._collections[type]).length) {
      return Object.values(this._collections[type]);
    }

    switch (type) {
      case 'songs':
        await API.fetchSongs();
        this._updateCollection('songs', 'song');
        break;

      default:
        throw Error(`Provided type ${type} is not supported`);
    }

    return Object.values(this._collections[type]);
  }

  /**
   * Set record
   * @param {string} type
   * @param {string} id
   * @param {object} data
   */
  setRecord(data, id) {
    if (!data.type) throw Error('A type is required to access the store');

    if (!id && !data.id) throw Error('An id is required to access a store record');

    const key = serializeKey(data.type, id ?? data.id);
    this._records[key] = data;
    return this._records[key];
  }

  /**
   * Builds a dictionary with all the
   * @param {string} type
   */
  _updateCollection(collectionName, type) {
    this._collections[collectionName] = Object.entries(this._records).reduce((acc, [recordKey, record]) => {
      if (record.type === type) {
        acc[recordKey] = record;
      }
      return acc;
    }, {});
  }
}

const store = new Store();

export default store;
