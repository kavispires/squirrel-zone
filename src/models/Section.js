// Global State
import { getDistributorGlobalState, setDistributorGlobalState } from '../states/useDistributorState';
// Models
import Line from './Line';
// Engine and utilities
import {
  generateUniqueId,
  getDefault,
  getRelationshipsDefault,
  getEnumDefault,
  serializeKey,
  getNullDefault,
  nullifyDefault,
  cleanupObject,
} from '../utils';
import { NULL, SECTION } from '../utils/enums';
import { ROMAN_NUMBER } from '../utils/constants';

/**
 * Class representing a Section - a collection of lines that will compose a song.
 */
export class Section {
  /**
   * Create a Section.
   * @constructor
   * @param {object} data - An object with the necessary data to be loaded in this instance
   */
  constructor(data) {
    this._id = data?.id || generateUniqueId();
    this._type = 'section';

    // Attributes
    this.kind = NULL;
    this.number = 1;

    // Relationships
    this.linesIds = [];
    this.songId = null;

    // Internal
    this._isSorted = false;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * Save section to the React Global State.
   */
  _save() {
    console.log('%cSaving section...', 'color:red');
    setDistributorGlobalState('sections', (state) => {
      return { ...state, [this.id]: this };
    });
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
      kind: NULL,
      number: 1,
    };
  }

  /**
   * List of lines.
   * @type {Line[]}
   */
  get lines() {
    const library = getDistributorGlobalState('lines') ?? {};
    const lines = this.linesIds.map((lineId) => library[lineId]);
    if (!this._isSorted) {
      return this.sort(lines);
    }
    return lines;
  }

  /**
   * List of parts ids according to this section lines
   */
  get partsIds() {
    return this.lines.map((line) => line.partsIds).flat();
  }

  /**
   * Get parent song instance
   * @type {Song|null}
   */
  get song() {
    const song = getDistributorGlobalState('song') ?? {};
    return song.id === this.songId ? song : null;
  }

  /**
   * Get the section before this instance in the song
   * @type {Section|null}
   */
  get previousSection() {
    const { sections = {} } = this.song ?? {};
    const { sectionsIds = {} } = this.song ?? {};
    const index = sectionsIds.findIndex((id) => id === this.id);
    if (index < 1) return null;

    return sections[index - 1];
  }

  /**
   * Get the section after this instance in the song
   * @type {Section|null}
   */
  get nextSection() {
    const { sections = {} } = this.song ?? {};
    const { sectionsIds = {} } = this.song ?? {};
    const index = sectionsIds.findIndex((id) => id === this.id);
    if (index === -1 || index >= sectionsIds.length) return null;

    return sections[index + 1];
  }

  /**
   * Builds name of the section
   * @type {string}
   */
  get name() {
    return `${this.kind} ${ROMAN_NUMBER[this.number]}`;
  }

  /**
   * Get start time.
   * @type {number}
   */
  get startTime() {
    const firstLine = this.lines[0];
    return firstLine?.startTime ?? 0;
  }

  /**
   * Get end time.
   * @type {number}
   */
  get endTime() {
    const lastLine = this.lines.length > 0 ? this.lines[this.lines.length - 1] : null;
    return lastLine?.endTime ?? 0;
  }

  /**
   * Get duration.
   * @type {number}
   */
  get duration() {
    return (this.endTime || 0) - (this.startTime || 0);
  }

  /**
   * Get aggregated text from each line.
   * @type {string}
   */
  get text() {
    if (!this.linesIds?.length) {
      return `[${this.placeholder}]`;
    }

    return this.lines
      .map((line) => {
        if (line && line instanceof Line) {
          if (line.isAdLib) {
            return `(${line.text})`;
          }

          return line.text;
        }
        return '';
      })
      .join('\n');
  }

  /**
   * Percentage (0-100) of completion of this instance.
   * @type {number}
   */
  get completion() {
    const criteria = [
      Boolean(this.songId), // has parent song
      Boolean(this.linesIds.length), // has at last one child line
      Boolean(SECTION?.[this.kind]), // has a section
    ];
    const complete = criteria.filter((i) => i);
    const attributesCompletion = (100 * complete.length) / criteria.length;

    return Math.floor((attributesCompletion + this.relationshipsCompletion) / 2);
  }

  /**
   * Percentage (0-100) of completion of the child relationships of this instance.
   */
  get relationshipsCompletion() {
    const relationshipsTotal = this.linesIds.length;
    const relationshipsCompleted = this.lines.filter((l) => l.isComplete);

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
   * @type {object}
   */
  get data() {
    return {
      id: this._id,
      // Getters
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.duration,
      text: this.text,
      // Attributes
      kind: this.kind,
      number: this.number,
      // Relationships
      linesIds: this.linesIds,
      songId: this.songId,
    };
  }

  /**
   * Sorts lines according to their starting time.
   * @method
   * @param {Line[]} lines
   * @returns {object[]}
   */
  sort(lines = this.lines) {
    const sortedLines = lines.sort((a, b) => (a.startTime >= b.startTime ? 1 : -1));

    this.linesIds = sortedLines.map((entry) => entry.id);
    this._isSorted = true;
    return sortedLines;
  }

  /**
   * Adds a line to the linesIds.
   * @method
   * @param {Line} line
   */
  addLine(line) {
    const id = line?.id ? line.id : line;
    const dict = Object.values(this.linesIds).reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    dict[id] = true;

    this.linesIds = Object.keys(dict);
    this.sort();

    this._save();

    return this;
  }

  /**
   * Removes a line from the linesIds.
   * @method
   * @param {string} id
   */
  removeLine(id) {
    const dict = Object.values(this.linesIds).reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    delete dict[id];

    this.linesIds = Object.keys(dict);

    this._save();
    return this;
  }

  /**
   * Connects parent relationship adding song-section one-to-many relationship end-to-end.
   * @method
   * @param {string} songId
   */
  connectSong(songId) {
    const library = getDistributorGlobalState('song') ?? {};
    const song = library.id === songId ? library : null;

    if (!song) throw Error(`Song ${songId} does not exist in the state`);

    song.addSection(this);
    this.deserialize({ songId });

    return this;
  }

  /**
   * Disconnects parent relationship removing song-section one-to-many relationship end-to-end.
   * @method
   * @param {string} songId
   */
  disconnectSong(songId) {
    const library = getDistributorGlobalState('song') ?? {};
    const song = library.id === songId ? library : null;

    if (song) {
      song.removeSection(this.id);
    }
    this.deserialize({ songId: null });

    return this;
  }

  /**
   * Connects child relationship adding section-line one-to-many relationship end-to-end.
   * @method
   * @param {string} lineId
   */
  connectLine(lineId) {
    const library = getDistributorGlobalState('lines') ?? {};
    const line = library[lineId] ?? null;

    if (!line) throw Error(`Section ${lineId} does not exist in the state`);

    line.deserialize({ sectionId: this.id });
    this.addLine(lineId);

    return this;
  }

  /**
   * Disconnects child relationship removing section-line one-to-many relationship end-to-end.
   * @method
   * @param {string} lineId
   */
  disconnectLine(lineId) {
    const library = getDistributorGlobalState('lines') ?? {};
    const line = library[lineId] ?? null;

    if (line) {
      line.deserialize({ sectionId: null });
    }
    this.removeLine(lineId);

    return this;
  }

  /**
   * De-serializes data and injects to this section instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id ?? this._id ?? generateUniqueId();
    // Attributes
    this.kind = getEnumDefault(this, data, 'kind', SECTION, SECTION.VERSE);
    this.number = getDefault(this, data, 'number', this.defaultValues.number);
    this.placeholder = getDefault(this, data, 'placeholder', '');
    // Relationships
    this.songId = getNullDefault(this, data, 'songId', null);
    this.linesIds = getRelationshipsDefault(this, data, 'linesIds', Line);

    this._save();
    return this;
  }

  /**
   * Serializes the section instance's relevant data.
   * @method
   * @returns {object}
   */
  serialize() {
    return cleanupObject({
      id: this.id,
      type: this.type,
      // Attributes
      kind: nullifyDefault(this, 'kind', this.defaultValues),
      number: nullifyDefault(this, 'number', this.defaultValues),
      // Relationships
      linesIds: this.linesIds,
      songId: this.songId,
    });
  }
}

export default Section;
