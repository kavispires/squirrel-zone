import { ASSIGNEE } from './enum';
import { generateUniqueId, serializeKey } from './utilities';

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
    this.parentLineId = null;

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
   * Get duration.
   * @type {number}
   */
  get duration() {
    return (this.endTime || 0) - (this.startTime || 0);
  }

  /**
   * Flag indicating if the part has all required values
   * @type {boolean}
   */
  get isComplete() {
    return Boolean(this.startTime && this.endTime && this.text && this.parentLineId);
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
      parentLineId: this.parentLineId,
    };

    Object.freeze(data);
    return data;
  }

  /**
   * De-serializes data and injects to this part instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id || this._id || generateUniqueId();
    // Attributes
    this.assignee = data.assignee ?? ASSIGNEE.A;
    this.endTime = data.endTime ?? null;
    this.startTime = data.startTime ?? null;
    this.text = data.text ?? null;
    // Relationships
    this.parentLineId = data.parentLineId ?? null;

    return this;
  }

  /**
   * Serializes the part instance's relevant data.
   * @method
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      type: this.type,
      // Attributes
      assignee: this.assignee,
      endTime: this.endTime,
      startTime: this.startTime,
      text: this.text,
      // Relationships
      parentLineId: this.parentLineId,
    };
  }
}

export default Part;
