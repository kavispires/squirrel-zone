// Global State
import { getGlobalState, setGlobalState } from '../../states/useDistributorState';
// Engine and utilities
import Section from './section';
import {
  generateUniqueId,
  getDefault,
  getNullDefault,
  getRelationshipsDefault,
  serializeKey,
} from './utilities';

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
    // Attributes
    this.videoId = '';
    this.title = '';
    this.version = '';
    this.createdAt = data.createdAt || Date.now();
    this.updatedAt = null;

    this.isSingle = false;
    this.idealGroupSize = 5;
    this.duration = 0;
    this.tempo = 0;
    this.genre = '';
    this.style = '';
    // Relationships
    this.sectionsIds = [];
    this.albumId = null;

    // Internal
    this._isSorted = true;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * Save song to the React Global State.
   */
  _save() {
    console.log('%cSaving song...', 'color:purple');
    setGlobalState('song', this);
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
    return serializeKey(this.type, this.id);
  }

  /**
   * List of sections.
   * @type {Part[]}
   */
  get sections() {
    const library = getGlobalState('sections') ?? [];
    const sections = this.sectionsIds.map((sectionId) => library[sectionId]);
    if (!this._isSorted) {
      return this.sort(sections);
    }
    return sections;
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
   * Get the id of the first line.
   * @type {string}
   */
  get firstLineId() {
    return this.sections?.[0]?.lines[0]?.id ?? null;
  }

  /**
   * Get the id of the last line.
   * @type {string}
   */
  get lastLineId() {
    const lastSection = this.sections?.[this.sections.length - 1];
    return lastSection?.lines[lastSection.lines.length - 1]?.id ?? null;
  }

  /**
   * Get a list of all ids of all parts in the song
   * @type {string[]}
   */
  get allPartsIds() {
    return this.sections
      .map((section) => section.lines)
      .flat()
      .map((line) => line.partsIds)
      .flat();
  }

  /**
   * Percentage (0-100) of completion of this instance.
   * @type {number}
   */
  get completion() {
    const criteria = [
      Boolean(this.videoId), // has a videoId
      Boolean(this.title), // has a title
      Boolean(this.duration), // has a duration
      Boolean(this.tempo), // has a tempo
      Boolean(this.genre), // has a genre
      Boolean(this.style), // has a style
      Boolean(this.sectionsIds.length), // has at last one child section
    ];
    const complete = criteria.filter((i) => i);
    const attributesCompletion = (100 * complete.length) / criteria.length;

    const relationshipsTotal = this.sectionsIds.length;
    const relationshipsCompleted = this.sections.filter((s) => s.isComplete);

    const relationshipsCompletion = (100 * relationshipsCompleted.length) / relationshipsTotal;
    return Math.floor((attributesCompletion + relationshipsCompletion) / 2);
  }

  /**
   * Flag indicating if the section has all required values.
   * @type {boolean}
   */
  get isComplete() {
    return this.completion === 100;
  }

  /**
   * Get the complete data set.
   */
  get data() {
    return {
      id: this.id,
      type: this._type,
      // Getters
      text: this.text,
      // Attributes
      videoId: this.videoId,
      title: this.title,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isSingle: this.isSingle,
      idealGroupSize: this.idealGroupSize,
      duration: this.duration,
      tempo: this.tempo,
      genre: this.genre,
      style: this.style,
      // Relationships
      albumId: this.albumId,
      sectionsIds: this.sectionsIds,
    };
  }

  /**
   * Sorts sections according to their starting time.
   * @method
   * @param {Section[]} sections
   * @returns {object[]}
   */
  sort(sections = this.sections) {
    const cache = Object.values(sections).reduce((res, section) => {
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

    const sortedSections = sortedTimes.reduce((acc, key) => {
      acc = [...acc, ...cache[key]];
      return acc;
    }, []);

    this.sectionsIds = sortedSections.map((entry) => entry.id);
    this._isSorted = true;
    return sortedSections;
  }

  /**
   * Adds a section to the sectionsIds.
   * @method
   * @param {Section} section
   */
  addSection(section) {
    const id = section?.id ? section.id : section;
    const dict = Object.values(this.sectionsIds).reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    dict[id] = true;

    this.sectionsIds = Object.keys(dict);
    this.sort();

    this._save();

    return this;
  }

  /**
   * Removes a section from the sectionsIds.
   * @method
   * @param {string} id
   */
  removeSection(id) {
    const dict = Object.values(this.sectionsIds).reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    delete dict[id];

    this.sectionsIds = Object.keys(dict);

    this._save();
    return this;
  }

  /**
   * Connects child relationship adding song-section one-to-many relationship end-to-end.
   * @method
   * @param {string} sectionId
   */
  connectSection(sectionId) {
    const library = getGlobalState('sections') ?? {};
    const section = library[sectionId] ?? null;

    if (!section) throw Error(`Section ${sectionId} does not exist in the state`);

    section.deserialize({ songId: this.id });
    this.addSection(this);

    return this;
  }

  /**
   * Removes song-section one-to-many relationship end-to-end.
   * @method
   * @param {string} sectionId
   */
  disconnectSection(sectionId) {
    const library = getGlobalState('sections') ?? {};
    const section = library[sectionId] ?? null;

    if (section) {
      section.deserialize({ songId: null });
    }
    this.removeSection(sectionId);

    return this;
  }

  /**
   * De-serializes data and injects to this song instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id ?? this._id ?? generateUniqueId();
    // Attributes
    this.videoId = getDefault(this, data, 'videoId', '');
    this.title = getDefault(this, data, 'title', '');
    this.version = getDefault(this, data, 'version', '');
    this.createdAt = getDefault(this, data, 'createdAt', Date.now());
    this.updatedAt = getDefault(this, data, 'updatedAt', Date.now());
    this.isSingle = getDefault(this, data, 'isSingle', false);
    this.idealGroupSize = getDefault(this, data, 'idealGroupSize', 5);
    this.duration = getDefault(this, data, 'duration', false);
    this.tempo = getDefault(this, data, 'tempo', '');
    this.genre = getDefault(this, data, 'genre', '');
    this.style = getDefault(this, data, 'style', '');
    // Relationships
    this.albumId = getNullDefault(this, data, 'albumId', null);
    this.sectionsIds = getRelationshipsDefault(this, data, 'sectionsIds', Section);

    this._save();
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
      // Attributes
      videoId: this.videoId,
      title: this.title,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isSingle: this.isSingle,
      idealGroupSize: this.idealGroupSize,
      duration: this.duration,
      tempo: this.tempo,
      genre: this.genre,
      style: this.style,
      // Relationships
      albumId: this.albumId,
      sectionsIds: this.sectionsIds,
    };
  }

  forceState() {
    // setGlobalState('activeLine', this);
  }
}

export default Song;
