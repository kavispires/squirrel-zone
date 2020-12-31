import { SECTION } from './enum';
import { generateUniqueId, serializeKey } from './utilities';
import { setGlobalState } from '../../states/useDistributorState';
import Line from './line';

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

    this.kind = SECTION.VERSE;
    this.number = 1;

    this._lines = {};
    this._sortedLines = [];
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
   * List of lines.
   * @type {Part[]}
   */
  get lines() {
    if (this._isSorted) {
      return this._sortedLines;
    }
    return this.sort();
  }

  /**
   * Builds name of the section
   * @type {string}
   */
  get name() {
    return `${this.kind} ${this.number}`;
  }

  /**
   * Get start time.
   * @type {number}
   */
  get startTime() {
    const start = this.lines[0];
    if (start && start instanceof Line) return start.startTime;

    return 0;
  }

  /**
   * Get end time.
   * @type {number}
   */
  get endTime() {
    const end = this.lines.length > 0 ? this.lines[this.lines.length - 1] : null;
    if (end && end instanceof Line) return end.endTime;

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
   * Get aggregated text from each line.
   * @type {string}
   */
  get text() {
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
   * Get the complete data set.
   * @type {object}
   */
  get data() {
    return {
      id: this._id,
      kind: this.kind,
      number: this.number,
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.duration,
      text: this.text,
      lines: this.lines,
    };
  }

  /**
   * Sorts parts according to their starting time.
   * @method
   * @returns {object[]}
   */
  sort() {
    const cache = Object.values(this._lines).reduce((res, line) => {
      if (line && line instanceof Line) {
        if (res[line.startTime]) {
          res[line.startTime].push(line);
        } else {
          res[line.startTime] = [line];
        }
      }
      return res;
    }, {});

    const sortedTimes = Object.keys(cache).map(Number).sort();

    this._sortedLines = sortedTimes.reduce((acc, key) => {
      acc = [...acc, ...cache[key]];
      return acc;
    }, []);
    this._isSorted = true;
    return this._sortedLines;
  }

  /**
   * Adds a part to the _lines object.
   * @method
   * @param {Part} part
   */
  addLine(line) {
    if (line.id) {
      this._lines[line.id] = line;
      this._isSorted = false;
      this.forceState();
    }

    return this;
  }

  /**
   * Removes a line from the _lines object.
   * @method
   * @param {string} id
   */
  removeLine(id) {
    if (this._lines[id]) {
      delete this._lines[id];
      this.forceState();
    }
    return this;
  }

  /**
   * De-serializes data and injects to this section instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id || this._id || generateUniqueId();
    this.kind = data.kind || SECTION.VERSE;
    this.number = data.number || 1;

    if (data.lines) {
      this._isSorted = false;
      this._sortedLines = [];
      Object.values(data.lines).forEach((line) => {
        if (line instanceof Line) {
          this.addLine(line);
        } else {
          this.addLine(new Line(line));
        }
      });
    }

    return this;
  }

  /**
   * Serializes the section instance's relevant data.
   * @method
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      type: this.type,
      lines: Object.values(this._lines).map((line) => line.serialize()),
      kind: this.kind,
      number: this.number,
    };
  }

  forceState() {
    // setGlobalState('activeSection', this);
  }
}

export default Section;
