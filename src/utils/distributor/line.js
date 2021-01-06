// Global State
import { getGlobalState, setGlobalState } from '../../states/useDistributorState';
// Engine and utilities
import Part from './part';
import { SKILL, SKILL_LEVEL, SKILL_TYPE } from './enum';
import {
  generateUniqueId,
  getDefault,
  getRelationshipsDefault,
  getEnumDefault,
  serializeKey,
  getNullDefault,
  nullifyDefault,
  cleanupObject,
} from './utilities';

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

    // Attributes
    this.isDismissible = false; // yeahs and yous that don't need to be displayed
    this.skill = SKILL.VOCAL;
    this.skillType = SKILL_TYPE.VOCAL.REGULAR;
    this.skillLevel = SKILL_LEVEL['1'];
    this.placeholder = 'oh yeah';

    // Relationships
    this.partsIds = [];
    this.sectionId = null;

    // Internal
    this._isSorted = false;

    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * Save line to the React Global State.
   */
  _save() {
    console.log('%cSaving line...', 'color:orange');
    setGlobalState('lines', (state) => {
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
      isDismissible: false,
      skill: SKILL.VOCAL,
      skillType: SKILL_TYPE.VOCAL.REGULAR,
      skillLevel: SKILL_LEVEL['1'],
    };
  }

  /**
   * List of parts.
   * @type {Part[]}
   */
  get parts() {
    const library = getGlobalState('parts') ?? {};
    const parts = this.partsIds.map((partId) => library[partId]);
    if (!this._isSorted) {
      return this.sort(parts);
    }
    return parts;
  }

  /**
   * Get parent section instance.
   * @type {Song|null}
   */
  get section() {
    const sections = getGlobalState('sections') ?? {};
    return sections[this.id] ?? null;
  }

  /**
   * Get the line before this instance in the section
   * @type {Line|null}
   */
  get previousLine() {
    const { lines = {} } = this.section ?? {};
    const { linesIds = {} } = this.section ?? {};
    const index = linesIds.findIndex((id) => id === this.id);
    if (index < 1) return null;

    return lines[index - 1];
  }

  /**
   * Get the line after this instance in the section
   * @type {Line|null}
   */
  get nextSection() {
    const { lines = {} } = this.section ?? {};
    const { linesIds = {} } = this.section ?? {};
    const index = linesIds.findIndex((id) => id === this.id);
    if (index === -1 || index >= linesIds.length) return null;

    return lines[index + 1];
  }

  /**
   * Get start time.
   * @type {number}
   */
  get startTime() {
    const firstPart = this.parts[0];

    return firstPart?.startTime ?? 0;
  }

  /**
   * Get end time.
   * @type {number}
   */
  get endTime() {
    const lastPart = this.parts.length > 0 ? this.parts[this.parts.length - 1] : null;

    return lastPart?.endTime ?? 0;
  }

  /**
   * Get duration.
   * @type {number}
   */
  get duration() {
    return this.endTime - this.startTime;
  }

  /**
   * Flag indicating if the line is an ad lib.
   * @type {boolean}
   */
  get isAdLib() {
    return this.skill === SKILL.AD_LIB;
  }

  /**
   * Flag indicating if the line is a rap.
   * @type {boolean}
   */
  get isRap() {
    return this.skill === SKILL.RAP;
  }

  /**
   * Flag indicating if the line is a dance line.
   * @type {boolean}
   */
  get isDance() {
    return this.skill === SKILL.DANCE;
  }

  /**
   * Flag indicating if the line is a choir line.
   * @type {boolean}
   */
  get isChoir() {
    return this.skill === SKILL.CHOIR;
  }

  /**
   * Get aggregated text from each part.
   * @type {string}
   */
  get text() {
    if (!this.partsIds?.length) {
      return `[${this.placeholder}]`;
    }

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
   * Percentage (0-100) of completion of this instance.
   * @type {number}
   */
  get completion() {
    const criteria = [
      Boolean(this.sectionId), // has parent section
      Boolean(this.partsIds.length), // has at last one child part
    ];
    const complete = criteria.filter((i) => i);
    const attributesCompletion = (100 * complete.length) / criteria.length;

    return Math.floor((attributesCompletion + this.relationshipsCompletion) / 2);
  }

  /**
   * Percentage (0-100) of completion of the child relationships of this instance.
   */
  get relationshipsCompletion() {
    const relationshipsTotal = this.partsIds.length;
    const relationshipsCompleted = this.parts.filter((p) => p.isComplete);

    return (100 * relationshipsCompleted.length) / relationshipsTotal;
  }

  /**
   * Flag indicating if the line has all required values.
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
      id: this.id,
      type: this.type,
      // Getters
      duration: this.duration,
      endTime: this.endTime,
      isAdLib: this.isAdLib,
      isChoir: this.isChoir,
      isComplete: this.isComplete,
      isDance: this.isDance,
      isRap: this.isRap,
      startTime: this.startTime,
      text: this.text,
      placeholder: this.placeholder,
      // Attributes
      skill: this.skill,
      skillType: this.skillType,
      skillLevel: this.skillLevel,
      // Relationships
      partsIds: this.partsIds,
      sectionId: this.sectionId,
    };
  }

  /**
   * Sorts parts according to their starting time.
   * @method
   * @param {Part[]} parts
   * @returns {object[]}
   */
  sort(parts = this.parts) {
    const sortedParts = parts.sort((a, b) => (a.startTime >= b.startTime ? 1 : -1));

    this.partsIds = sortedParts.map((entry) => entry.id);
    this._isSorted = true;
    this._save();
    return sortedParts;
  }

  /**
   * Adds a part to the partsIds.
   * @method
   * @param {Part|string} part
   */
  addPart(part) {
    const id = part?.id ? part.id : part;
    const dict = Object.values(this.partsIds).reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    dict[id] = true;

    this.partsIds = Object.keys(dict);
    this.sort();

    this._save();

    return this;
  }

  /**
   * Removes a part from the partsIds object.
   * @method
   * @param {string} id
   */
  removePart(id) {
    const dict = Object.values(this.partsIds).reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});

    delete dict[id];

    this.partsIds = Object.keys(dict);

    this._save();
    return this;
  }

  /**
   * Connects parent relationship adding section-line one-to-many relationship end-to-end.
   * @method
   * @param {string} sectionId
   */
  connectSection(sectionId) {
    const library = getGlobalState('sections') ?? {};
    const section = library[sectionId] ?? null;

    if (!section) throw Error(`Section ${sectionId} does not exist in the state`);

    section.addLine(this);
    this.deserialize({ sectionId });

    return this;
  }

  /**
   * Disconnects parent relationship removing section-line one-to-many relationship end-to-end.
   * @method
   * @param {string} sectionId
   */
  disconnectSection(sectionId) {
    const library = getGlobalState('sections') ?? {};
    const section = library[sectionId] ?? null;

    if (section) {
      section.removeLine(this.id);
    }
    this.deserialize({ sectionId: null });

    return this;
  }

  /**
   * Connects child relationship adding line-part one-to-many relationship end-to-end.
   * @method
   * @param {string} partId
   */
  connectLine(partId) {
    const library = getGlobalState('parts') ?? {};
    const part = library[partId] ?? null;

    if (!part) throw Error(`Part ${partId} does not exist in the state`);

    part.deserialize({ lineId: this.id });
    this.addPart(partId);

    return this;
  }

  /**
   * Disconnects child relationship removing line-part one-to-many relationship end-to-end.
   * @method
   * @param {string} partId
   */
  disconnectLine(partId) {
    const library = getGlobalState('parts') ?? {};
    const part = library[partId] ?? null;

    if (part) {
      part.deserialize({ lindId: null });
    }
    this.removePart(part);

    return this;
  }

  /**
   * De-serializes data and injects to this line instance.
   * @method
   * @param {object|null} data
   */
  deserialize(data) {
    this._id = data.id || this._id || generateUniqueId();
    // Attributes
    this.isDismissible = getDefault(this, data, 'isDismissible', false);
    this.skill = getEnumDefault(this, data, 'skill', SKILL, this.defaultValues.skill);
    this.skillType = getDefault(this, data, 'skillType', this.defaultValues.skillType);
    this.skillLevel = getEnumDefault(this, data, 'skillLevel', SKILL_LEVEL, this.defaultValues.skillType);
    this.placeholder = getDefault(this, data, 'placeholder', 'oh yeah');
    // Relationships
    this.sectionId = getNullDefault(this, data, 'sectionId', null);
    this.partsIds = getRelationshipsDefault(this, data, 'partsIds', Part);

    this._save();
    return this;
  }

  /**
   * Serializes the line instance's relevant data.
   * @method
   * @returns {object}
   */
  serialize() {
    return cleanupObject({
      id: this.id,
      type: this.type,
      // Attributes
      isDismissible: nullifyDefault(this, 'isDismissible', this.defaultValues),
      skill: nullifyDefault(this, 'skill', this.defaultValues),
      skillType: nullifyDefault(this, 'skillType', this.defaultValues),
      skillLevel: nullifyDefault(this, 'skillLevel', this.defaultValues),
      // Relationships
      partsIds: this.partsIds,
      sectionId: this.sectionId,
    });
  }
}

export default Line;
