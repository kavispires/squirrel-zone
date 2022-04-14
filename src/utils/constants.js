export const DATA_TYPE = {
  ALBUM: 'album',
  DISTRIBUTION: 'distribution',
  DISTRIBUTION_DATA: 'distribution-data',
  GROUP: 'group',
  MEMBER: 'member',
  MEMBER_DATA: 'member-data',
  SONG: 'song',
  SONG_DATA: 'song-data',
};

export const DATA_TYPE_COLLECTION = {
  [DATA_TYPE.ALBUM]: 'albums',
  [DATA_TYPE.DISTRIBUTION]: 'distributions',
  [DATA_TYPE.DISTRIBUTION_DATA]: 'distributions-data',
  [DATA_TYPE.GROUP]: 'groups',
  [DATA_TYPE.MEMBER]: 'members',
  [DATA_TYPE.MEMBER_DATA]: 'members-data',
  [DATA_TYPE.SONG]: 'songs',
  [DATA_TYPE.SONG_DATA]: 'songs-data',
};

export const KEYS = [' ', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const KEY_ASSIGNEE = {
  ' ': 'S',
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
  9: 'I',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: '',
  G: 'G',
  H: 'H',
  I: 'I',
};

export const POSITIONS = {
  LEADER: 'LEADER',
  MAIN_VOCALIST: 'MAIN_VOCALIST',
  LEAD_VOCALIST: 'LEAD_VOCALIST',
  VOCALIST: 'VOCALIST',
  SUB_VOCALIST: 'SUB_VOCALIST',
  MAIN_RAPPER: 'MAIN_RAPPER',
  LEAD_RAPPER: 'LEAD_RAPPER',
  RAPPER: 'RAPPER',
  MAIN_DANCER: 'MAIN_DANCER',
  LEAD_DANCER: 'LEAD_DANCER',
  DANCER: 'DANCER',
  VISUAL: 'VISUAL',
  CENTER: 'CENTER',
};

export const POSITIONS_WEIGHT = {
  MAIN_VOCALIST: 0,
  MAIN_RAPPER: 1,
  MAIN_DANCER: 2,
  VISUAL: 3,
  CENTER: 4,
  LEADER: 5,
  LEAD_VOCALIST: 6,
  LEAD_RAPPER: 7,
  LEAD_DANCER: 8,
  VOCALIST: 9,
  RAPPER: 10,
  DANCER: 11,
  SUB_VOCALIST: 12,
};

export const ROMAN_NUMBER = {
  0: '?',
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII',
  13: 'XIII',
  14: 'XIV',
  15: 'XV',
};

export const SEPARATOR = '::';

export const DISTRIBUTION_SEPARATOR = '+++';

export const DEFAULT_MEMBERS = {
  'member::ALL': {
    id: 'ALL',
    type: 'member',
    key: 'member::ALL',
    name: 'All',
    color: '#4c5c68',
    positions: ['ALL'],
  },
  'member::NONE': {
    id: 'NONE',
    type: 'member',
    key: 'member::NONE',
    name: 'None',
    color: '#899ba9',
    positions: ['NONE'],
  },
};

function buildScaleOptions() {
  const chords = [
    'C',
    'C#',
    'Db',
    'D',
    'D#',
    'Eb',
    'E',
    'F',
    'F#',
    'Gb',
    'G',
    'G#',
    'Ab',
    'A',
    'A#',
    'Bb',
    'B',
  ];
  return chords.map((chord) => [`${chord} Major`, `${chord} Minor`]).flat();
}

export const MUSIC_SCALE = buildScaleOptions();

export const DISTRIBUTION_NAME = {
  ORIGINAL: 'ORIGINAL',
  COVER: 'COVER',
  SPECIAL: 'SPECIAL',
  WHAT_IF: 'WHAT_IF',
  REDO: 'REDO',
};

export const IMAGE_URL = {
  AVATAR: `${process.env.PUBLIC_URL}/images/members/`,
  GROUP: `${process.env.PUBLIC_URL}/images/groups/`,
};

export const NEW_INSTANCE_ID = '_new';

export const DISTRIBUTOR_STEPS = [
  'Start',
  'Lyrics & Sections',
  'Time & Sync',
  'Preview',
  'Adjustments',
  'Metadata & Save',
];
