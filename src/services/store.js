import API from '../api';
import { DATA_TYPE, DATA_TYPE_COLLECTION } from '../utils/constants';
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
      case DATA_TYPE.DISTRIBUTION_DATA:
        await API.fetchDistributionData(id);
        break;
      case DATA_TYPE.MEMBER_DATA:
        await API.fetchMember(id);
        break;
      case DATA_TYPE.SONG:
        await API.fetchSong(id);
        break;
      case DATA_TYPE.SONG_DATA:
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
   * @param {boolean} [asObject] return result as object
   * @returns {object[]}
   */
  async getCollection(type, asObject = false, extra = null) {
    if (!type) throw Error('A type is required to access the store');

    if (this._collections[type] && Object.values(this._collections[type]).length && !extra) {
      if (asObject) {
        return this._collections[type];
      }
      return Object.values(this._collections[type]).sort(collectionSorting[type]);
    }

    const [filterKey, id] = Object.entries(extra ?? {})?.[0] ?? [];

    if (filterKey && id && this._collections[type] && Object.values(this._collections[type]).length) {
      const result = Object.values(this._collections[type])
        .filter((entry) => entry[filterKey] === id)
        .sort(collectionSorting[type]);

      if (result.length > 0) {
        return result;
      }
    }

    switch (type) {
      case DATA_TYPE_COLLECTION[DATA_TYPE.DISTRIBUTION]:
        await API.fetchDistributions(id);
        this._updateCollection(DATA_TYPE.DISTRIBUTION, true);
        break;
      case DATA_TYPE_COLLECTION[DATA_TYPE.GROUP]:
        await API.fetchGroups();
        this._updateCollection(DATA_TYPE.GROUP);
        break;
      case DATA_TYPE_COLLECTION[DATA_TYPE.MEMBER]:
        await API.fetchMembers();
        this._updateCollection(DATA_TYPE.MEMBER);
        break;
      case DATA_TYPE_COLLECTION[DATA_TYPE.SONG]:
        await API.fetchSongs();
        this._updateCollection(DATA_TYPE.SONG);
        break;

      default:
        throw Error(`Provided type ${type} is not supported`);
    }

    if (asObject) {
      return this._collections[type];
    }

    if (filterKey && id) {
      return Object.values(this._collections[type])
        .filter((entry) => entry[filterKey] === id)
        .sort(collectionSorting[type]);
    }

    return Object.values(this._collections[type]).sort(collectionSorting[type]);
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

    // Force collection deletion
    this._collections[DATA_TYPE_COLLECTION[data.type]] = null;

    return this._records[key];
  }

  /**
   * Builds a dictionary with all the
   * @param {string} type
   * @param {boolean} [isAdditive] - indicates if the incoming data should just be added to the existing one
   */
  _updateCollection(type, isAdditive = false) {
    const incomingData = Object.entries(this._records).reduce((acc, [recordKey, record]) => {
      if (record.type === type) {
        acc[recordKey] = record;
      }
      return acc;
    }, {});

    if (isAdditive) {
      this._collections[DATA_TYPE_COLLECTION[type]] = {
        ...this._collections[DATA_TYPE_COLLECTION[type]],
        ...incomingData,
      };
    } else {
      this._collections[DATA_TYPE_COLLECTION[type]] = incomingData;
    }
  }
}

const DEFAULT_SORTING = (a, b) => {
  const x = a.id;
  const y = b.id;
  return x < y ? -1 : x > y ? 1 : 0;
};

const collectionSorting = {
  [DATA_TYPE_COLLECTION[DATA_TYPE.ALBUM]]: (a, b) => {
    const x = a?.title ?? a.id;
    const y = b?.title ?? b.id;
    return x < y ? -1 : x > y ? 1 : 0;
  },
  [DATA_TYPE_COLLECTION[DATA_TYPE.DISTRIBUTION]]: (a, b) => {
    const x = a?.songTitle ?? a?.name ?? a.id;
    const y = b?.songTitle ?? b?.name ?? b.id;
    return x < y ? -1 : x > y ? 1 : 0;
  },
  [DATA_TYPE_COLLECTION[DATA_TYPE.DISTRIBUTION_DATA]]: DEFAULT_SORTING,
  [DATA_TYPE_COLLECTION[DATA_TYPE.GROUP]]: (a, b) => {
    const x = a?.debutYear ?? a?.name ?? a.id;
    const y = b?.debutYear ?? b?.name ?? b.id;
    return x < y ? -1 : x > y ? 1 : 0;
  },
  [DATA_TYPE_COLLECTION[DATA_TYPE.MEMBER]]: (a, b) => {
    const x = a?.age ?? a?.name ?? a.id;
    const y = b?.age ?? b?.name ?? b.id;
    return x < y ? -1 : x > y ? 1 : 0;
  },
  [DATA_TYPE_COLLECTION[DATA_TYPE.MEMBER_DATA]]: DEFAULT_SORTING,
  [DATA_TYPE_COLLECTION[DATA_TYPE.SONG]]: (a, b) => {
    const x = a?.title ?? a?.version ?? a.id;
    const y = b?.title ?? b?.version ?? b.id;
    return x < y ? -1 : x > y ? 1 : 0;
  },
  [DATA_TYPE_COLLECTION[DATA_TYPE.SONG_DATA]]: DEFAULT_SORTING,
};

const store = new Store();

export default store;
