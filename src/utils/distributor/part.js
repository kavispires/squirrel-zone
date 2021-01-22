// Global State
import { getDistributorGlobalState, setDistributorGlobalState } from '../../states/useDistributorState';
// Engine and utilities
import { ASSIGNEE } from './enum';
import {
  cleanupObject,
  generateUniqueId,
  getDefault,
  getEnumDefault,
  getNullDefault,
  nullifyDefault,
  serializeKey,
} from './utilities';

/**
 * Class representing a Part - the smallest part of the lyrics, it composes a line.
 */
export class Part {
  /**
   * Create a Part.
   * @constructor
   * @param {object} data - An object with the necessary data to be loaded in this instance
   */
  constructor(data) {
    this._id = data?.id || generateUniqueId();
    this._type = 'part';

    // Attributes
    this.assignee = ASSIGNEE.A;
    this.endTime = null;
    this.startTime = null;
    this.text = null;

    // Relationships
    this.lineId = null;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * Save part to the React Global State.
   */
  _save() {
    console.log('%cSaving part...', 'color:yellow');
    setDistributorGlobalState('parts', (state) => {
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
      assignee: ASSIGNEE.A,
    };
  }

  /**
   * Get duration.
   * @type {number}
   */
  get duration() {
    return (this.endTime || 0) - (this.startTime || 0);
  }

  /**
   * Percentage (0-100) of completion of this instance.
   * @type {number}
   */
  get completion() {
    const criteria = [
      this.duration > 0, // If has start and end time positive difference
      Boolean(this.text), // Has text
      Boolean(this.lineId), // Has its parent line
    ];
    const complete = criteria.filter((i) => i);
    return Math.floor((100 * complete.length) / criteria.length);
  }

  /**
   * Flag indicating if the part has all required values.
   * @type {boolean}
   */
  get isComplete() {
    return Math.floor(this.completion === 100);
  }

  /**
   * Get the complete data set.
   * @type {object}
   */
  get data() {
    const data = {
      id: this._id,
      type: this.type,
      // Getters
      isComplete: this.isComplete,
      duration: this.duration,
      // Attributes
      assignee: this.assignee,
      endTime: this.endTime,
      startTime: this.startTime,
      text: this.text,
      // Relationships
      lineId: this.lineId,
    };

    Object.freeze(data);
    return data;
  }

  /**
   * Updates time information and assignee.
   * @param {*} timestamp
   * @returns {string} the instance id
   */
  updateTimestamp({ startTime, endTime, assignee }) {
    if (assignee) {
      this.assignee = assignee;
    }
    this.startTime = startTime;
    this.endTime = endTime;

    // TODO: Since we have access to partId from the timestamp, should we disconnect?

    this._save();

    return this.id;
  }

  /**
   * Connects parent relationship adding line-part one-to-many relationship end-to-end.
   * @method
   * @param {string} lineId
   */
  connectSection(lineId) {
    const library = getDistributorGlobalState('lines') ?? {};
    const line = library[lineId] ?? null;

    if (!line) throw Error(`Line ${lineId} does not exist in the state`);

    line.addPart(this);
    this.deserialize({ lineId });

    return this;
  }

  /**
   * Disconnects parent relationship removing line-part one-to-many relationship end-to-end.
   * @method
   * @param {string} lineId
   */
  disconnectSection(lineId) {
    const library = getDistributorGlobalState('lines') ?? {};
    const line = library[lineId] ?? null;

    if (line) {
      line.removePart(this.id);
    }
    this.deserialize({ lineId: null });

    return this;
  }

  /**
   * De-serializes data and injects to this part instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id || this._id || generateUniqueId();
    // Attributes
    this.assignee = getEnumDefault(this, data, 'assignee', ASSIGNEE, this.defaultValues.assignee);
    this.endTime = getDefault(this, data, 'endTime', null);
    this.startTime = getDefault(this, data, 'startTime', null);
    this.text = getDefault(this, data, 'text', null);
    if (this.text) {
      this.text = this.text.trim();
    }
    // Relationships
    this.lineId = getNullDefault(this, data, 'lineId', null);

    this._save();
    return this;
  }

  /**
   * Serializes the part instance's relevant data.
   * @method
   * @returns {object}
   */
  serialize() {
    return cleanupObject({
      id: this.id,
      type: this.type,
      // Attributes
      assignee: nullifyDefault(this, 'assignee', this.defaultValues),
      endTime: this.endTime,
      startTime: this.startTime,
      text: this.text ? this.text.trim() : this.text,
      // Relationships
      lineId: this.lineId,
    });
  }
}

export default Part;
