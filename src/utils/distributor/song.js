import Section from './section';
import { generateUniqueId, serializeKey } from './utilities';
import { setGlobalState } from '../../states/useDistributorState';

/**
 * Class representing a Song - a collection of sections.
 */
export class Song {
  /**
   * Create a Song.
   * @constructor
   * @param {object} data - An object with the necessary data to be loaded in this instance
   */
  constructor(data) {
    this._id = data.id || generateUniqueId();
    this._type = 'song';

    this.videoId = '';
    this.title = '';
    this.version = '';
    this.createdAt = data.createdAt || Date.now();
    this.updatedAt = null;
    this.albumId = '';
    this.isSingle = '';
    this.idealGroupSize = 5;
    this.duration = 0;
    this.tempo = 0;
    this.genre = '';
    this.style = '';

    this._sections = {};
    this._sortedSections = [];
    this._isSorted = true;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * Get id.
   * @type {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Get type.
   * @type {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Get key.
   * @type {string}
   */
  get key() {
    return serializeKey(this.id, this.type);
  }

  /**
   * List of sections.
   * @type {Part[]}
   */
  get sections() {
    if (this._isSorted) {
      return this._sortedSections;
    }
    return this.sort();
  }

  /**
   * Get aggregated text from each part.
   * @type {string}
   */
  get text() {
    return this.sections
      .map((section) => {
        if (section && section instanceof Section) {
          return section.text;
        }
        return '';
      })
      .join('\n');
  }

  /**
   * Get the complete data set.
   */
  get data() {
    return {
      id: this._id,
      videoId: this.videoId,
      title: this.title,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      albumId: this.albumId,
      isSingle: this.isSingle,
      idealGroupSize: this.idealGroupSize,
      duration: this.duration,
      tempo: this.tempo,
      genre: this.genre,
      style: this.style,
      sections: this.sections,
      text: this.text,
    };
  }

  /**
   * Sorts sections according to their starting time.
   * @method
   * @returns {object[]}
   */
  sort() {
    const cache = Object.values(this._sections).reduce((res, section) => {
      if (section && section instanceof Section) {
        if (res[section.startTime]) {
          res[section.startTime].push(section);
        } else {
          res[section.startTime] = [section];
        }
      }
      return res;
    }, {});

    const sortedTimes = Object.keys(cache).map(Number).sort();

    this._sortedSections = sortedTimes.reduce((acc, key) => {
      acc = [...acc, ...cache[key]];
      return acc;
    }, []);
    this._isSorted = true;
    return this._sortedSections;
  }

  /**
   * Adds a section to the _sections object.
   * @method
   * @param {Section} section
   */
  addSection(section) {
    if (section.id) {
      this._sections[section.id] = section;
      this._isSorted = false;
      this.forceState();
    }

    return this;
  }

  /**
   * Removes a section from the _sections object.
   * @method
   * @param {string} id
   */
  removeSection(id) {
    if (this._sections[id]) {
      delete this._sections[id];
      this.forceState();
    }

    return this;
  }

  /**
   * De-serializes data and injects to this song instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id || this._id || generateUniqueId();
    this.videoId = data.videoId || '';
    this.title = data.title || '';
    this.version = data.version || '';
    this.createdAt = data.createdAt || Date.now();
    this.updatedAt = data.updatedAt || Date.now();
    this.albumId = data.albumId || '';
    this.isSingle = data.isSingle || '';
    this.idealGroupSize = data.idealGroupSize || 5;
    this.duration = data.duration || 0;
    this.tempo = data.tempo || 0;
    this.genre = data.genre || '';
    this.style = data.style || '';

    if (data.sections) {
      this._isSorted = false;
      this._sortedSections = [];
      Object.values(data.sections).forEach((section) => {
        if (section instanceof Section) {
          this.addSection(section);
        } else {
          this.addSection(new Section(section));
        }
      });
    }

    return this;
  }

  /**
   * Serializes the song instance's relevant data.
   * @method
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      type: this.type,
      sections: Object.values(this._sections).map((section) => section.serialize()),

      videoId: this.videoId,
      title: this.title,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      albumId: this.albumId,
      isSingle: this.isSingle,
      idealGroupSize: this.idealGroupSize,
      duration: this.duration,
      tempo: this.tempo,
      genre: this.genre,
      style: this.style,
    };
  }

  forceState() {
    // setGlobalState('activeLine', this);
  }
}

export default Song;
