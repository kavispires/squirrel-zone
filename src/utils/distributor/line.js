import { SKILL, SKILL_LEVEL, SKILL_TYPE } from './enum';
import Part from './part';
import { generateUniqueId } from './utilities';
import { setGlobalState } from '../../states/useDistributorState';

/**
 * Class representing a Line - a collection of parts that will compose a section/verse.
 */
export class Line {
  /**
   * Create a Line.
   * @constructor
   * @param {object} data - An object with the necessary data to be loaded in this instance
   */
  constructor(data) {
    this._id = data?.id || generateUniqueId();
    this._type = 'line';

    this.isDismissible = false; // yeahs and yous that don't need to be displayed
    this.skill = SKILL.VOCAL;
    this.skillType = SKILL_TYPE.VOCAL.REGULAR;
    this.level = SKILL_LEVEL['1'];

    this._parts = {};
    this._sortedParts = [];
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
   * List of parts.
   * @type {Part[]}
   */
  get parts() {
    if (this._isSorted) {
      return this._sortedParts;
    }
    return this.sort();
  }

  /**
   * Get start time.
   * @type {number}
   */
  get startTime() {
    const start = this.parts[0];
    if (start && start instanceof Part) return start.startTime;

    return 0;
  }

  /**
   * Get end time.
   * @type {number}
   */
  get endTime() {
    const end = this.parts.length > 0 ? this.parts[this.parts.length - 1] : null;
    if (end && end instanceof Part) return end.endTime;

    return 0;
  }

  /**
   * Get duration.
   * @type {number}
   */
  get duration() {
    return (this.endTime || 0) - (this.startTime || 0);
  }

  /**
   * Flag indicating if the line is an ad lib.
   * @type {boolean}
   */
  get isAdLib() {
    return Boolean(SKILL.AD_LIB);
  }

  /**
   * Flag indicating if the line is a rap.
   * @type {boolean}
   */
  get isRap() {
    return Boolean(SKILL.RAP);
  }

  /**
   * Flag indicating if the line is a dance line.
   * @type {boolean}
   */
  get isDance() {
    return Boolean(SKILL.DANCE);
  }

  /**
   * Flag indicating if the line is a choir line.
   * @type {boolean}
   */
  get isChoir() {
    return Boolean(SKILL.CHOIR);
  }

  /**
   * Get aggregated text from each part.
   * @type {string}
   */
  get text() {
    return this.parts
      .map((part) => {
        if (part && part instanceof Part) {
          return part.text;
        }
        return '';
      })
      .join(' ');
  }

  /**
   * Get the complete data set.
   * @type {object}
   */
  get data() {
    return {
      id: this.id,
      type: this.type,
      startTime: this.startTime,
      endTime: this.endTime,
      text: this.text,
      parts: this.parts,
      skill: this.skill,
      skillType: this.skillType,
      level: this.level,
    };
  }

  /**
   * Sorts parts according to their starting time.
   * @method
   * @returns {object[]}
   */
  sort() {
    const cache = Object.values(this._parts).reduce((res, part) => {
      if (part && part instanceof Part) {
        if (res[part.startTime]) {
          res[part.startTime].push(part);
        } else {
          res[part.startTime] = [part];
        }
      }
      return res;
    }, {});

    const sortedTimes = Object.keys(cache).map(Number).sort();

    this._sortedParts = sortedTimes.reduce((acc, key) => {
      acc = [...acc, ...cache[key]];
      return acc;
    }, []);
    this._isSorted = true;
    return this._sortedParts;
  }

  /**
   * Adds a part to the _parts object.
   * @method
   * @param {Part} part
   */
  addPart(part) {
    if (part.id) {
      this._parts[part.id] = part;
      this._isSorted = false;
      this.forceState();
    }

    return this;
  }

  /**
   * Removes a part from the _parts object.
   * @method
   * @param {string} id
   */
  removePart(id) {
    if (this._parts[id]) {
      delete this._parts[id];
      this.forceState();
    }

    return this;
  }

  /**
   * De-serializes data and injects to this line instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id || this._id || generateUniqueId();
    this.isDismissible = data.isDismissible ?? false;
    this.skill = data.skill || SKILL.VOCAL;
    this.skillType = data.skillType || SKILL_TYPE.VOCAL.REGULAR;
    this.level = data.level || SKILL_LEVEL['1'];

    if (data.parts) {
      this._isSorted = false;
      this._sortedParts = [];
      Object.values(data.parts).forEach((part) => {
        if (part instanceof Part) {
          this.addPart(part);
        } else {
          this.addPart(new Part(part));
        }
      });
    }

    return this;
  }

  /**
   * Serializes the line instance's relevant data.
   * @method
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      type: this.type,
      parts: this._parts,
      isDismissible: this.isDismissible,
      skill: this.skill,
      skillType: this.skillType,
      level: this.level,
    };
  }

  forceState() {
    // setGlobalState('activeLine', this);
  }
}

export default Line;
