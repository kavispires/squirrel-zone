// Global State
import { getDistributorGlobalState, setDistributorGlobalState } from '../../states/useDistributorState';
// Engine and utilities
import Section from './section';
import {
  generateUniqueId,
  getDefault,
  getNullDefault,
  getRelationshipsDefault,
  nullifyDefault,
  serializeKey,
} from './utilities';
import moment from 'moment';

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
    this._id = data.id || 0; // Set to 0 so firebase can know to create a new key for it
    this._type = 'song';
    // Attributes
    this.videoId = '';
    this.title = '';
    this.version = '';
    this.createdAt = data.createdAt || Date.now();
    this.updatedAt = null;

    this.isSingle = false;
    this.idealGroupSize = 5;
    this.duration = moment(0, 'mm:ss');
    this.tempo = 0;
    this.genre = '';
    this.scale = 'UNKNOWN';
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
    this.updatedAt = Date.now();
    setDistributorGlobalState('song', this);
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
   * Dictionary of default values for this instance.
   */
  get defaultValues() {
    return {
      isSingle: false,
      idealGroupSize: 5,
      tempo: 0,
      scale: 'UNKNOWN',
    };
  }

  /**
   * List of sections.
   * @type {Part[]}
   */
  get sections() {
    const library = getDistributorGlobalState('sections') ?? {};
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
   * Get a list of all ids of all parts in the song.
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
   * Total number of parts on the song.
   * @type {type}
   */
  get partsCount() {
    return this.allPartsIds.length;
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
      Boolean(this.scale && this.scale !== 'UNKNOWN'), // has a scale
      Boolean(this.style), // has a style
      Boolean(this.sectionsIds.length), // has at last one child section
    ];
    const complete = criteria.filter((i) => i);
    const attributesCompletion = (100 * complete.length) / criteria.length;

    return Math.floor((attributesCompletion + this.relationshipsCompletion) / 2);
  }

  /**
   * Percentage (0-100) of completion of the child relationships of this instance.
   */
  get relationshipsCompletion() {
    const relationshipsTotal = this.sectionsIds.length;
    const relationshipsCompleted = this.sections.filter((s) => s.isComplete);

    return (100 * relationshipsCompleted.length) / relationshipsTotal;
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
      partsCount: this.partsCount,
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
      scale: this.scale,
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
    const sortedSections = sections.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

    // Renumber the parts. e.g. VERSE 1, VERSE 2, etc...
    const sectionsNumbers = {};
    sortedSections.forEach((section) => {
      if (sectionsNumbers[section.kind]) {
        sectionsNumbers[section.kind] += 1;
        section.deserialize({ number: sectionsNumbers[section.kind] });
      } else {
        sectionsNumbers[section.kind] = 1;
      }
    });

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
    const library = getDistributorGlobalState('sections') ?? {};
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
    const library = getDistributorGlobalState('sections') ?? {};
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
    const duration = getDefault(this, data, 'duration', 0);
    if (duration) {
      this.duration = moment(duration, 'mm:ss');
    }
    this.tempo = getDefault(this, data, 'tempo', '');
    this.genre = getDefault(this, data, 'genre', '');
    this.scale = getDefault(this, data, 'scale', '');
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
    // Gather included relationships
    const included = [];
    const sectionsLibrary = getDistributorGlobalState('sections') ?? {};
    const linesLibrary = getDistributorGlobalState('lines') ?? {};
    const partsLibrary = getDistributorGlobalState('parts') ?? {};
    this.sectionsIds.forEach((sectionId) => {
      const section = sectionsLibrary[sectionId];
      // Add section serialized data to included
      included.push(section.serialize());
      // Iterate though lines
      section.linesIds.forEach((lineId) => {
        const line = linesLibrary[lineId];
        // Add section serialized data to included
        included.push(line.serialize());
        // Iterate though parts
        line.partsIds.forEach((partId) => {
          const part = partsLibrary[partId];
          // Add section serialized data to included
          included.push(part.serialize());
        });
      });
    });

    return {
      id: this.id,
      type: this.type,

      song: {
        id: this.id,
        type: this.type,
        albumId: nullifyDefault(this, 'albumId', this.defaultValues),
        completion: this.completion,
        createdAt: nullifyDefault(this, 'createdAt', this.defaultValues),
        duration: this.duration.format('mm:ss'),
        genre: nullifyDefault(this, 'genre', this.defaultValues),
        isComplete: this.isComplete,
        isSingle: nullifyDefault(this, 'isSingle', this.defaultValues),
        idealGroupSize: nullifyDefault(this, 'idealGroupSize', this.defaultValues),
        scale: nullifyDefault(this, 'scale', this.defaultValues),
        style: nullifyDefault(this, 'style', this.defaultValues),
        tempo: nullifyDefault(this, 'tempo', this.defaultValues),
        title: nullifyDefault(this, 'title', this.defaultValues),
        version: nullifyDefault(this, 'version', this.defaultValues),
        videoId: nullifyDefault(this, 'videoId', this.defaultValues),
        updatedAt: Date.now(),
      },
      data: {
        id: this.id,
        type: 'song-data',

        sectionsIds: this.sectionsIds,
        included,
      },
    };
  }
}

export default Song;
