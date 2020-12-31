import { ASSIGNEE } from './enum';
import { generateUniqueId } from './utilities';

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
    this.startTime = null;
    this.endTime = null;
    this.text = null;
    this.assignee = ASSIGNEE.A;

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
    return Boolean(this.startTime && this.endTime && this.text);
  }

  /**
   * Get the complete data set.
   * @type {object}
   */
  get data() {
    return {
      id: this._id,
      type: this.type,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.duration,
      text: this.text,
      assignee: this.assignee,
    };
  }

  /**
   * De-serializes data and injects to this part instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id || this._id || generateUniqueId();
    this.startTime = data.startTime ?? null;
    this.endTime = data.endTime ?? null;
    this.text = data.text ?? null;
    this.assignee = data.assignee ?? ASSIGNEE.A;

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
      startTime: this.startTime,
      endTime: this.endTime,
      text: this.text,
      assignee: this.assignee,
    };
  }
}

export default Part;
