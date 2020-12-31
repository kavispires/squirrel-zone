import { generateUniqueId, serializeKey } from './utilities';

export class Store {
  constructor() {
    this._store = {};
  }

  /**
   * Determines if the data exists in the store
   * @method
   * @param {object} data
   * @returns {boolean}
   */
  exists(data) {
    if (!data || !data.type || !data.id) return false;

    const key = data.key ?? serializeKey(data.id, data.type);

    return Boolean(this.findByKey(key));
  }

  /**
   * Find entry by key
   * @method
   * @param {string} key
   * @returns {object}
   */
  findByKey(key) {
    return this._store[key] ?? null;
  }

  /**
   * Find entry by id and type
   * @method
   * @param {string} id
   * @param {string} type
   * @returns {object}
   */
  find(id, type) {
    const key = serializeKey(id, type);
    return this._store[key] ?? null;
  }

  /**
   * Find entry by id
   * @method
   * @param {string} id
   * @returns {object}
   */
  findById(id) {
    return Object.values(this._store).find((entry) => entry.id === id);
  }

  /**
   * Find entry by type
   * @method
   * @param {string} key
   * @returns {object[]}
   */
  findByType(type) {
    return Object.values(this._store).filter((item) => item.type === type);
  }

  /**
   * Adds or updates data to the store
   * @method
   * @param {object} data
   * @returns {object}
   */
  add(data) {
    if (!data || !data.type) return;

    const id = data.id || generateUniqueId();
    const key = data.key ?? serializeKey(id, data.type);

    if (this._store[key] === undefined) {
      this._store[key] = {};
    }

    if (data.serialize) {
      this._store[key] = data.serialize();
    } else {
      this._store[key] = data;
    }

    return this._store[key];
  }

  /**
   * Deletes entry by type
   * @method
   * @param {string} key
   * @returns {undefined}
   */
  delete(data) {
    if (this.exists(data)) {
      const key = data.key ?? serializeKey(data.id, data.type);
      delete this._store[key];
    }
  }

  /**
   * Deletes entry by type
   * @method
   * @param {string} key
   * @returns {undefined}
   */
  deleteByKey(key) {
    delete this._store[key];
  }

  /**
   * Clears store
   * @method
   */
  clear() {
    this._store = {};
  }
}

export const store = new Store();

export default Store;
